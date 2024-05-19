import GPTService from 'service/api/gpt'

import { setupCursorHover, setupCursorHoverInfo } from 'misc/cursorhover'
import { ConfigToggle, ConfigSegmentedSelection } from 'misc/configwidgets'
import MarginRevealer from 'misc/marginrevealer'

import { bash } from 'lib/utils'
import options from 'options'

const { Gtk } = imports.gi

const Info = Widget.Box(
  { vertical: true },
  Widget.Icon({
    hpack: 'center',
    icon: 'openai-symbolic',
    className: 'welcome-logo',
  }),
  Widget.Label({
    wrap: true,
    label: 'Assistant (GPTs)',
    justify: Gtk.Justification.CENTER,
    className: 'sidebar-chat-welcome-txt',
  }),
  Widget.Box(
    { hpack: 'center' },
    Widget.Label({
      wrap: true,
      label: 'Provider shown above',
      justify: Gtk.Justification.CENTER,
    }),
    Widget.Button({
      label: 'info',
      setup: setupCursorHoverInfo,
      tooltipText: 'Uses gpt-3.5-turbo.\nNot affiliated, endorsed, or sponsored by OpenAI.\n\nPrivacy: OpenAI claims they do not use your data\nwhen you use their API. Idk about others.',
    }),
  ),
)

const Instructions = Widget.Box([
  Widget.Revealer({
    transition: 'slide_down',
    transitionDuration: options.transition,
    child: Widget.Button({
      child: Widget.Label({
        wrap: true,
        useMarkup: true,
        justify: Gtk.Justification.CENTER,
        className: 'txt sidebar-chat-welcome-txt',
        label: 'An API key is required\nYou can grab one <u>here</u>, then enter it below',
      }),
      setup: setupCursorHover,
      onClicked() { bash`xdg-open ${GPTService.getKeyUrl}` },
    }),
  }).hook(
    GPTService,
    (self) => (self.revealChild = GPTService.key.length == 0),
    'hasKey',
  ),
])

const Settings = MarginRevealer({
  revealChild: true,
  transition: 'slide_down',
  extraSetup: self => self
    .hook(GPTService, self => Utils.timeout(200, () => self.attribute.hide()), 'newMsg')
    .hook(GPTService, self => Utils.timeout(200, () => self.attribute.show()), 'clear'),
  child: Widget.Box({
    vertical: true,
    className: 'sidebar-chat-settings',
    children: [
      ConfigSegmentedSelection({
        hpack: 'center',
        desc: "The model's temperature value.\n  Precise = 0\n  Balanced = 0.5\n  Creative = 1",
        options: [
          { value: 0.0, name: 'Precise' },
          { value: 0.5, name: 'Balanced' },
          { value: 1.0, name: 'Creative' },
        ],
        initIndex: 2,
        onChange(value) { (GPTService.temperature = value) }
      }),
      Widget.Box({
        hpack: 'fill',
        vertical: true,
        className: 'sidebar-chat-settings-toggles',
        child: ConfigToggle({
          name: 'Enhancements',
          icon: 'model_training',
          initValue: GPTService.assistantPrompt,
          onChange(_, newValue) { (GPTService.assistantPrompt = newValue) },
          desc: "Tells the model:\n- It's a Linux sidebar assistant\n- Be brief and use bullet points",
        }),
      }),
    ],
  }),
})

export default Widget.Box({ vertical: true }, Info, Instructions, Settings)
