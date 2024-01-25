import { App, Utils, Widget } from '../../../../../../imports.js'
import { ChatGPT } from '../../../../../../services/main.js'
import { SystemMessage, ChatMessage } from './chatgpt_chatmessage.js'
import { MarginRevealer } from '../../../../../../misc/AdvancedRevealers.js'
import { ConfigToggle, ConfigSegmentedSelection, ConfigGap } from '../../../../../../misc/ConfigWidgets.js'
import { markdownTest } from '../../../../../../misc/Md2Pango.js'
import { setupCursorHover, setupCursorHoverInfo } from '../../../../../../misc/CursorHover.js'
import { utils } from '../../../../../../constants/main.js'

const { Gtk } = imports.gi

export const chatGPTTabIcon = Widget.Box({
  hpack: 'center',
  homogeneous: true,
  className: 'sidebar-chat-apiswitcher-icon',
  children: [Widget.Label({ label: 'forum', className: 'txt-norm' })],
})

const chatGPTInfo = Widget.Box({
  vertical: true,
  className: 'spacing-v-15',
  children: [
    Widget.Icon({
      hpack: 'center',
      className: 'sidebar-chat-welcome-logo',
      icon: `${App.configDir}/assets/chatgpt.svg`,
      setup: self => Utils.timeout(400, () => {
        const styleContext = self.get_style_context()
        const width = styleContext.get_property('min-width', Gtk.StateFlags.NORMAL)
        const height = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL)
        self.size = Math.max(width, height, 1) * 116 / 180 // Why such a specific proportion? See https://openai.com/brand#logos
      })
    }),
    Widget.Label({
      className: 'txt txt-title-small sidebar-chat-welcome-txt',
      wrap: true,
      justify: Gtk.Justification.CENTER,
      label: 'ChatGPT',
    }),
    Widget.Box({
      className: 'spacing-h-5',
      hpack: 'center',
      children: [
        Widget.Label({
          className: 'txt-smallie txt-subtext',
          wrap: true,
          justify: Gtk.Justification.CENTER,
          label: 'Powered by OpenAI',
        }),
        Widget.Button({
          className: 'txt-subtext txt-norm icon-material',
          label: 'info',
          tooltipText: 'Uses gpt-3.5-turbo.\nNot affiliated, endorsed, or sponsored by OpenAI.',
          setup: setupCursorHoverInfo,
        }),
      ]
    }),
  ]
})

export const chatGPTSettings = MarginRevealer({
  revealChild: true,
  transition: 'slide_down',
  extraSetup: self => self
    .hook(ChatGPT, self => Utils.timeout(200, () => {
      self.attribute.hide()
    }), 'newMsg')
    .hook(ChatGPT, self => Utils.timeout(200, () => {
      self.attribute.show()
    }), 'clear'),
  
  child: Widget.Box({
    vertical: true,
    className: 'sidebar-chat-settings',
    children: [
      ConfigSegmentedSelection({
        hpack: 'center',
        // icon: 'casino',
        name: 'Randomness',
        desc: 'ChatGPT\'s temperature value.\n  Precise = 0\n  Balanced = 0.5\n  Creative = 1',
        options: [
          { value: 0.00, name: 'Precise', },
          { value: 0.50, name: 'Balanced', },
          { value: 1.00, name: 'Creative', },
        ],
        initIndex: 2,
        onChange: value => {
          ChatGPT.temperature = value
        },
      }),
      ConfigGap({ vertical: true, size: 10 }), // Note: size can only be 5, 10, or 15 
      Widget.Box({
        vertical: true,
        hpack: 'fill',
        className: 'sidebar-chat-settings-toggles',
        children: [
          ConfigToggle({
            icon: 'cycle',
            name: 'Cycle models',
            desc: 'Helps avoid exceeding the API rate of 3 messages per minute.\nTurn this on if you message rapidly.',
            initValue: ChatGPT.cycleModels,
            onChange: (_, newValue) => {
              ChatGPT.cycleModels = newValue
            },
          }),
          ConfigToggle({
            icon: 'description',
            name: 'Assistant prompt',
            desc: 'Tells ChatGPT\n  1. It\'s a sidebar assistant on Linux\n  2. Be short and concise\n  3. Use markdown features extensively\nLeave this off for a vanilla ChatGPT experience.',
            initValue: ChatGPT.assistantPrompt,
            onChange: (_, newValue) => {
              ChatGPT.assistantPrompt = newValue
            },
          }),
        ]
      })
    ]
  })
})

export const openaiApiKeyInstructions = Widget.Box({
  homogeneous: true,
  children: [Widget.Revealer({
    transition: 'slide_down',
    transitionDuration: 150,
    connections: [[ChatGPT, self => self.revealChild = (ChatGPT.key.length == 0), 'hasKey']],
    child: Widget.Button({
      child: Widget.Label({
        wrap: true,
        useMarkup: true,
        justify: Gtk.Justification.CENTER,
        className: 'txt sidebar-chat-welcome-txt',
        label: 'An OpenAI API key is required\nYou can grab one <u>here</u>, then enter it below'
      }),
      setup: setupCursorHover,
      onClicked: () => {
        utils.execBash('xdg-open https://platform.openai.com/api-keys &')
      }
    })
  })]
})

export const chatGPTWelcome = Widget.Box({
  vexpand: true,
  homogeneous: true,
  child: Widget.Box({
    className: 'spacing-v-15',
    vpack: 'center',
    vertical: true,
    children: [
      chatGPTInfo,
      openaiApiKeyInstructions,
      chatGPTSettings, ''
    ]
  })
})

export const chatContent = Widget.Box({
  className: 'spacing-v-15',
  vertical: true,
  connections: [[
    ChatGPT, (box, id) => {
      const message = ChatGPT.messages[id]
      if (!message) return
      box.add(ChatMessage(message, chatGPTView))
    }, 'newMsg'
  ]]
})

const clearChat = () => {
  ChatGPT.clear()
  const children = chatContent.get_children()
  for (let i = 0; i < children.length; i++) {
    const child = children[i]
    child.destroy()
  }
}

export const chatGPTView = Widget.Scrollable({
  className: 'sidebar-chat-viewport',
  vexpand: true,
  child: Widget.Box({
    vertical: true,
    children: [ chatGPTWelcome, chatContent ]
  }),
  setup: scrolledWindow => {
    // Show scrollbar
    scrolledWindow.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
    const vScrollbar = scrolledWindow.get_vscrollbar()
    vScrollbar.get_style_context().add_class('qs-scrollbar')
    // Avoid click-to-scroll-widget-to-view behavior
    Utils.timeout(1, () => {
      const viewport = scrolledWindow.child
      viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined))
    })
    // Always scroll to bottom with new content
    const adjustment = scrolledWindow.get_vadjustment()
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

export const chatGPTCommands = Widget.Box({
  className: 'spacing-h-5',
  children: [
    Widget.Box({ hexpand: true }),
    CommandButton('/key'),
    CommandButton('/model'),
    CommandButton('/clear'),
  ]
})

export const sendMessage = (text) => {
  // Check if text or API key is empty
  if (text.length == 0) return
  if (ChatGPT.key.length == 0) {
    ChatGPT.key = text
    chatContent.add(SystemMessage(`Key saved to\n\`${ChatGPT.keyPath}\``, 'API Key', chatGPTView))
    text = ''
    return
  }
  // Commands
  if (text.startsWith('/')) {
    if (text.startsWith('/clear')) clearChat()
    else if (text.startsWith('/model')) chatContent.add(SystemMessage(`Currently using \`${ChatGPT.modelName}\``, '/model', chatGPTView))
    else if (text.startsWith('/prompt')) {
      const firstSpaceIndex = text.indexOf(' ')
      const prompt = text.slice(firstSpaceIndex + 1)
      if (firstSpaceIndex == -1 || prompt.length < 1)
        chatContent.add(SystemMessage('Usage: `/prompt MESSAGE`', '/prompt', chatGPTView))
      else ChatGPT.addMessage('user', prompt)
    }
    else if (text.startsWith('/key')) {
      const parts = text.split(' ')
      if (parts.length == 1) chatContent.add(SystemMessage(
        `Key stored in:\n\`${ChatGPT.keyPath}\`\nTo update this key, type \`/key YOUR_API_KEY\``,
        '/key',
        chatGPTView))
      else {
        ChatGPT.key = parts[1]
        chatContent.add(SystemMessage(`Updated API Key at\n\`${ChatGPT.keyPath}\``, '/key', chatGPTView))
      }
    }
    else if (text.startsWith('/test'))
      chatContent.add(SystemMessage(markdownTest, 'Markdown test', chatGPTView))
    else
      chatContent.add(SystemMessage('Invalid command.', 'Error', chatGPTView))
  }
  else ChatGPT.send(text)
}
