const { Gtk } = imports.gi

import Gemini from 'service/api/gemini'
import { bash } from 'lib/utils'
import { setupCursorHover, setupCursorHoverInfo } from 'misc/cursorhover'
import { SystemMessage, ChatMessage } from './aimessage'
import { ConfigToggle, ConfigSegmentedSelection, ConfigGap } from 'misc/configWidgets'
import { markdownTest } from './md2pango'
import { MarginRevealer } from 'misc/advancedrevealers'

Gtk.IconTheme.get_default().append_search_path(`${App.configDir}/assets/icons`)
const MODEL_NAME = `Gemini`

export const geminiTabIcon = Widget.Icon({
  hpack: 'center',
  icon: `google-gemini-symbolic`,
  className: 'sidebar-chat-apiswitcher-icon',
})

const GeminiInfo = () => {
  const geminiLogo = Widget.Icon({
    hpack: 'center',
    icon: `google-gemini-symbolic`,
    className: 'sidebar-chat-welcome-logo',
  });
  return Widget.Box({
    vertical: true,
    children: [
      geminiLogo,
      Widget.Label({
        wrap: true,
        justify: Gtk.Justification.CENTER,
        label: 'Assistant (Gemini Pro)',
        className: 'txt txt-title-small sidebar-chat-welcome-txt',
      }),
      Widget.Box({
        hpack: 'center',
        className: 'spacing-h-5',
        children: [
          Widget.Label({
            wrap: true,
            label: 'Powered by Google',
            justify: Gtk.Justification.CENTER,
            className: 'txt-smallie txt-subtext',
          }),
          Widget.Button({
            label: 'info',
            setup: setupCursorHoverInfo,
            className: 'txt-subtext txt-norm',
            tooltipText: 'Uses gemini-pro.\nNot affiliated, endorsed, or sponsored by Google.\n\nPrivacy: Google collects data for training by default.\nIf you mind, turn off Gemini Apps Activity in your account.',
          }),
        ]
      }),
    ]
  });
}

export const GeminiSettings = () => MarginRevealer({
  revealChild: true,
  transition: 'slide_down',
  extraSetup: self => self.hook(Gemini, (self) => Utils.timeout(200, () => {
    self.attribute.hide()
  }), 'newMsg').hook(Gemini, (self) => Utils.timeout(200, () => {
    self.attribute.show()
  }), 'clear'),
  child: Widget.Box({
    vertical: true,
    className: 'sidebar-chat-settings',
    children: [
      ConfigSegmentedSelection({
        hpack: 'center',
        icon: 'casino',
        name: 'Randomness',
        desc: 'Gemini\'s temperature value.\n  Precise = 0\n  Balanced = 0.5\n  Creative = 1',
        options: [
          { value: 0.00, name: 'Precise', },
          { value: 0.50, name: 'Balanced', },
          { value: 1.00, name: 'Creative', },
        ],
        initIndex: 2,
        onChange: val => Gemini.temperature = val,
      }),
      ConfigGap({ vertical: true, size: 10 }), // Note: size can only be 5, 10, or 15
      Widget.Box({
        vertical: true,
        hpack: 'fill',
        className: 'sidebar-chat-settings-toggles',
        children: [
          ConfigToggle({
            icon: 'model_training',
            name: 'Enhancements',
            initValue: Gemini.assistantPrompt,
            onChange: (_, newValue) => Gemini.assistantPrompt = newValue,
            desc: 'Tells Gemini:\n- It\'s a Linux sidebar assistant\n- Be brief and use bullet points',
          }),
        ]
      })
    ]
  })
});

export const GoogleAiInstructions = () => Widget.Box({
  homogeneous: true,
  children: [
    Widget.Revealer({
      transition: 'slide_down',
      transitionDuration: 150,
      setup: self => self.hook(Gemini, self => self.revealChild = (Gemini.key.length == 0), 'hasKey'),
      child: Widget.Button({
        setup: setupCursorHover,
        child: Widget.Label({
          useMarkup: true,
          wrap: true,
          className: 'txt sidebar-chat-welcome-txt',
          justify: Gtk.Justification.CENTER,
          label: 'A Google AI API key is required\nYou can grab one <u>here</u>, then enter it below'
        }),
        onClicked: () => bash`xdg-open https://makersuite.google.com/app/apikey &`
      })
    })
  ]
})

const geminiWelcome = Widget.Box({
  vexpand: true,
  homogeneous: true,
  child: Widget.Box({
    vertical: true,
    vpack: 'center',
    children: [
      GeminiInfo(),
      GoogleAiInstructions(),
      GeminiSettings(),
    ]
  })
})

export const chatContent = Widget.Box({
  className: 'spacing-v-15',
  vertical: true,
  setup: self => self.hook(Gemini, (box, id) => {
    const message = Gemini.messages[id]
    if (!message) return
    box.add(ChatMessage(message, MODEL_NAME))
  }, 'newMsg'),
})

const clearChat = () => {
  Gemini.clear()
  const children = chatContent.get_children()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    child.destroy()
  }
}

export const geminiView = Widget.Scrollable({
  className: 'sidebar-chat-viewport',
  vexpand: true,
  child: Widget.Box({
    vertical: true,
    children: [ geminiWelcome, chatContent ]
  }),
  setup: (scrolledWindow) => {
    // Show scrollbar
    scrolledWindow.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
    const vScrollbar = scrolledWindow.get_vscrollbar()
    vScrollbar.get_style_context().add_class('sidebar-scrollbar')
    // Avoid click-to-scroll-widget-to-view behavior
    Utils.timeout(1, () => {
      const viewport = scrolledWindow.child
      viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined))
    })
    // Always scroll to bottom with new content
    const adjustment = scrolledWindow.get_vadjustment();
    adjustment.connect('changed', () => {
      adjustment.set_value(adjustment.get_upper() - adjustment.get_page_size())
    })
  }
})

const CommandButton = (command) => Widget.Button({
  className: 'sidebar-chat-chip sidebar-chat-chip-action txt txt-small',
  onClicked: () => sendMessage(command),
  setup: setupCursorHover,
  label: command,
})

export const geminiCommands = Widget.Box({
  className: 'spacing-h-5',
  children: [
    Widget.Box({ hexpand: true }),
    CommandButton('/key'),
    CommandButton('/model'),
    CommandButton('/clear'),
  ]
});

export const sendMessage = (text: string) => {
  // Check if text or API key is empty
  if (text.length == 0) return
  if (Gemini.key.length == 0) {
    Gemini.key = text
    chatContent.add(SystemMessage(`Key saved to\n\`${Gemini.keyPath}\``, 'API Key', geminiView))
    text = ''
    return
  }
  // Commands
  if (text.startsWith('/')) {
    if (text.startsWith('/clear'))
      clearChat()
    else if (text.startsWith('/model'))
      chatContent.add(SystemMessage(`Currently using \`${Gemini.modelName}\``, '/model', geminiView))
    else if (text.startsWith('/prompt')) {
      const firstSpaceIndex = text.indexOf(' ')
      const prompt = text.slice(firstSpaceIndex + 1)
      if (firstSpaceIndex == -1 || prompt.length < 1)
        chatContent.add(SystemMessage(`Usage: \`/prompt MESSAGE\``, '/prompt', geminiView))
      else Gemini.addMessage('user', prompt)
    }
    else if (text.startsWith('/key')) {
      const parts = text.split(' ')
      if (parts.length == 1)
        chatContent.add(
          SystemMessage(`Key stored in:\n\`${Gemini.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``, '/key', geminiView))
      else {
        Gemini.key = parts[1]
        chatContent.add(SystemMessage(`Updated API Key at\n\`${Gemini.keyPath}\``, '/key', geminiView))
      }
    }
    else if (text.startsWith('/test'))
      chatContent.add(SystemMessage(markdownTest, `Markdown test`, geminiView))
    else
      chatContent.add(SystemMessage(`Invalid command.`, 'Error', geminiView))
  }
  else Gemini.send(text)
}
