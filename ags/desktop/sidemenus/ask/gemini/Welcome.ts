import GeminiService from 'service/api/gemini'

import { ConfigToggle, ConfigSegmentedSelection } from 'misc/configwidgets'
import MarginRevealer from 'misc/marginrevealer'

import options from 'options'
import { bash } from 'lib/utils'

const { Gtk } = imports.gi

const Instructions = Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  child: Widget.Button({
    cursor: 'pointer',
    child: Widget.Label({
      wrap: true,
      useMarkup: true,
      className: 'chat-welcome-txt',
      justify: Gtk.Justification.CENTER,
      label: 'A Google AI API key is required\nYou can grab one <u>here</u>, then enter it below',
    }),
    onClicked() { bash`xdg-open https://makersuite.google.com/app/apikey &` },
  }),
}).hook(GeminiService, self => self.revealChild = GeminiService.key.length === 0, 'hasKey')

const Settings = MarginRevealer({
  revealChild: true,
  transition: 'slide_down',
  extraSetup(self) {
    self.hook(GeminiService, () => Utils.timeout(200, self.attribute.hide), 'newMsg')
    self.hook(GeminiService, () => Utils.timeout(200, self.attribute.show), 'clear')
  },
  child: Widget.Box({
    vertical: true,
    className: 'chat-settings',
    children: [
      ConfigSegmentedSelection({
        initIndex: 2,
        hpack: 'center',
        name: 'Randomness',
        desc: "Gemini's temperature value.\n  Precise = 0\n  Balanced = 0.5\n  Creative = 1",
        options: [
          { value: 0.0, name: 'Precise' },
          { value: 0.5, name: 'Balanced' },
          { value: 1.0, name: 'Creative' },
        ],
        onChange(value) { GeminiService.temperature = value },
      }),
      Widget.Box({
        hpack: 'fill',
        vertical: true,
        className: 'toggles',
        children: [
          ConfigToggle({
            icon: '',
            name: 'Enhancements',
            initValue: GeminiService.assistantPrompt,
            onChange(_, newValue) { GeminiService.assistantPrompt = newValue },
            desc: "Tells Gemini:\n- It's a Linux sidebar assistant\n- Be brief and use bullet points",
          }),
          ConfigToggle({
            icon: '󰒘',
            name: 'Safety',
            initValue: GeminiService.safe,
            onChange(_, newValue) { GeminiService.safe = newValue },
            desc: 'When turned off, tells the API (not the model) \nto not block harmful/explicit content',
          }),
          ConfigToggle({
            icon: '',
            name: 'History',
            initValue: GeminiService.useHistory,
            onChange(_, newValue) { GeminiService.useHistory = newValue },
            desc: "Saves chat history\nMessages in previous chats won't show automatically, but they are there",
          }),
        ],
      }),
    ],
  })
})

export default Widget.Box(
  { vpack: 'center', vertical: true },
  Widget.Icon({
    hpack: 'center',
    icon: 'gemini-logo',
    className: 'welcome-logo',
  }), Instructions, Settings
)
