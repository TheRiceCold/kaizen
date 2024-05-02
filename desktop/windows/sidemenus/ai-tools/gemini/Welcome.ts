import GeminiService from 'service/api/gemini'

import { setupCursorHover, setupCursorHoverInfo } from 'misc/cursorhover'
import { ConfigToggle, ConfigSegmentedSelection } from 'misc/configwidgets'
import MarginRevealer from 'misc/marginrevealer'

import options from 'options'
import { bash } from 'lib/utils'

const { Gtk } = imports.gi

const Info = Widget.Box(
  { vertical: true },
  Widget.Icon({
    hpack: 'center',
    icon: 'google-gemini-symbolic',
  }),
  Widget.Label({
    wrap: true,
    label: 'Assistant (Gemini Pro)',
    justify: Gtk.Justification.CENTER,
  }),
  Widget.Box(
    { hpack: 'center' },
    Widget.Label({
      wrap: true,
      label: 'Powered by Google',
      justify: Gtk.Justification.CENTER,
    }),
    Widget.Button({
      label: 'info',
      setup: setupCursorHoverInfo,
      tooltipText:
        "Uses gemini-pro.\nNot affiliated, endorsed, or sponsored by Google.\n\nPrivacy: Chat messages aren't linked to your account,\n    but will be read by human reviewers to improve the model.",
    }),
  ),
)

const Instructions = Widget.Revealer({
  revealChild: true,
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  child: Widget.Button({
    child: Widget.Label({
      wrap: true,
      useMarkup: true,
      className: 'sidebar-chat-welcome-txt',
      justify: Gtk.Justification.CENTER,
      label: 'A Google AI API key is required\nYou can grab one <u>here</u>, then enter it below',
      // setup: self => self.set_markup("This is a <a href=\"https://www.github.com\">test link</a>")
    }),
    setup: setupCursorHover,
    onClicked: () => bash`xdg-open https://makersuite.google.com/app/apikey &`,
  }),
}).hook(GeminiService, self => self.revealChild = GeminiService.key.length == 0, 'hasKey')

const Settings = MarginRevealer({
  revealChild: true,
  transition: 'slide_down',
  extraSetup: self => self
    .hook(GeminiService, self => Utils.timeout(200, () => self.attribute.hide()), 'newMsg')
    .hook(GeminiService, self => Utils.timeout(200, () => self.attribute.show()), 'clear'),
  child: Widget.Box({
    vertical: true,
    className: 'sidebar-chat-settings',
    children: [
      ConfigSegmentedSelection({
        hpack: 'center',
        name: 'Randomness',
        desc: "Gemini's temperature value.\n  Precise = 0\n  Balanced = 0.5\n  Creative = 1",
        initIndex: 2,
        options: [
          { value: 0.0, name: 'Precise' },
          { value: 0.5, name: 'Balanced' },
          { value: 1.0, name: 'Creative' },
        ],
        onChange: value => GeminiService.temperature = value,
      }),
      Widget.Box({
        vertical: true,
        hpack: 'fill',
        className: 'sidebar-chat-settings-toggles',
        children: [
          ConfigToggle({
            icon: 'model_training',
            name: 'Enhancements',
            desc: "Tells Gemini:\n- It's a Linux sidebar assistant\n- Be brief and use bullet points",
            initValue: GeminiService.assistantPrompt,
            onChange: (self, newValue) => GeminiService.assistantPrompt = newValue,
          }),
          ConfigToggle({
            icon: 'shield',
            name: 'Safety',
            desc: 'When turned off, tells the API (not the model) \nto not block harmful/explicit content',
            initValue: GeminiService.safe,
            onChange: (self, newValue) => GeminiService.safe = newValue,
          }),
          ConfigToggle({
            icon: 'history',
            name: 'History',
            desc: "Saves chat history\nMessages in previous chats won't show automatically, but they are there",
            initValue: GeminiService.useHistory,
            onChange: (self, newValue) => GeminiService.useHistory = newValue,
          }),
        ],
      }),
    ],
  })
})

export default Widget.Box({ vpack: 'center', vertical: true }, Info, Instructions, Settings)
