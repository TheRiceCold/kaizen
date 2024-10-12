import { type BoxProps } from 'types/widgets/box'
import { type LabelProps } from 'types/widgets/label'
import { type ButtonProps } from 'types/widgets/button'

import GeminiService from 'service/api/gemini'

import { VBox } from 'widgets'
import { ScrollableProps } from 'types/widgets/scrollable'

const { Box, Button, Icon, Label, Revealer } = Widget

export const ConfigToggle = ({
  name,
  desc = '',
  initValue,
  expandWidget = true,
  onChange = () => {},
  ...props
}: {
  name: string
  desc: string
  initValue: boolean
  expandWidget?: boolean
  onChange: (button: ButtonProps, value: boolean) => void
}) => {
  const enabled = Variable<boolean>(initValue)
  const toggleIcon = Label({
    label: `${enabled.value ? '' : ''}`,
  }).hook(enabled, (self: LabelProps) => {
    self.toggleClassName('switch-fg-toggling-false', false)
    if (!enabled.value) {
      self.label = ''
      self.toggleClassName('txt-poof', true)
    } else
      Utils.timeout(1, () => {
        toggleIcon.label = ''
        toggleIcon.toggleClassName('txt-poof', false)
      })
  })

  const toggleButtonIndicator = Box(
    {
      vpack: 'center',
      hpack: 'start',
      homogeneous: true,
      className: `switch-fg ${enabled.value ? 'switch-fg-true' : ''}`,
    },
    toggleIcon,
  ).hook(enabled, (self: BoxProps) =>
    self.toggleClassName('switch-fg-true', enabled.value),
  )

  const toggleButton = Box(
    {
      hpack: 'end',
      homogeneous: true,
      className: `switch-bg ${enabled.value ? 'switch-bg-true' : ''}`,
    },
    toggleButtonIndicator,
  ).hook(enabled, (self: BoxProps) =>
    self.toggleClassName('switch-bg-true', enabled.value),
  )

  const widgetContent = Box({
    tooltipText: desc,
    className: 'configtoggle-box',
    children: [
      Label(name),
      expandWidget ? Box({ hexpand: true }) : null,
      toggleButton,
    ],
  })
  const interactionWrapper = Button({
    attribute: {
      enabled: enabled,
      toggle() {
        enabled.value = !enabled.value
        onChange(interactionWrapper, enabled.value)
      },
    },
    child: widgetContent,
    onClicked(self: ButtonProps) {
      self.attribute.toggle(self)
    },
    cursor: 'pointer',
    setup(self: ButtonProps) {
      self.connect('pressed', () => {
        toggleIcon.toggleClassName('txt-poof', true)
        toggleIcon.toggleClassName('switch-fg-true', false)
        if (!enabled.value)
          toggleIcon.toggleClassName('switch-fg-toggling-false', true)
      })
    },
    ...props,
  })
  interactionWrapper.enabled = enabled
  return interactionWrapper
}

function Settings() {
  let lastSelected = 0
  const chatSettings = VBox(
    { className: 'chat-settings' },
    Box({
      hpack: 'center',
      className: 'segment-container',
      tooltipText:
        "Gemini's temperature value.\n  Precise = 0\n  Balanced = 0.5\n  Creative = 1",
      children: [
        { value: 0.0, name: 'Precise' },
        { value: 0.5, name: 'Balanced' },
        { value: 1.0, name: 'Creative' },
      ].map((option, id) => {
        const selectedIcon = Revealer({
          child: Label(''),
          revealChild: id == 0,
          transition: 'slide_right',
        })

        return Button(
          {
            cursor: 'pointer',
            className: `segment-btn ${id == 0 ? 'segment-btn-enabled' : ''}`,
            onClicked(self: ButtonProps) {
              const kids = self.parent.get_children()
              kids[lastSelected].toggleClassName('segment-btn-enabled', false)
              kids[lastSelected]
                .get_children()[0]
                .get_children()[0].revealChild = false
              lastSelected = id
              self.toggleClassName('segment-btn-enabled', true)
              selectedIcon.revealChild = true
              //GeminiService.temperature = value
            },
          },
          Box({ hpack: 'center' }, selectedIcon, Label(option.name)),
        )
      }),
    }),

    VBox(
      { hpack: 'fill', className: 'toggles' },
      ConfigToggle({
        name: 'Enhancements',
        initValue: GeminiService.assistantPrompt,
        onChange(_self: ButtonProps, newValue: boolean) { GeminiService.assistantPrompt = newValue },
        desc: "Tells Gemini:\n- It's a Linux sidebar assistant\n- Be brief and use bullet points",
      }),
      ConfigToggle({
        name: 'Safety',
        initValue: GeminiService.safe,
        onChange(_self: ButtonProps, newValue: boolean) { GeminiService.safe = newValue },
        desc: 'When turned off, tells the API (not the model) \nto not block harmful/explicit content',
      }),
      ConfigToggle({
        name: 'History',
        initValue: GeminiService.useHistory,
        onChange(_self: ButtonProps, newValue: boolean) {
          GeminiService.useHistory = newValue
        },
        desc: "Saves chat history\nMessages in previous chats won't show automatically, but they are there",
      }),
    ),
  )

  const widget = Widget.Scrollable({
    attribute: {
      revealChild: true, // It'll be set to false after init if it's supposed to hide
      transition: 'slide_down',
      show() {
        if (widget.attribute.revealChild) return
        widget.hscroll = 'never'
        widget.vscroll = 'never'
        chatSettings.toggleClassName('element-hide', false)
        chatSettings.toggleClassName('element-show', true)
        widget.attribute.revealChild = true
        chatSettings.css = 'margin: 0;'
      },
      hide() {
        if (!widget.attribute.revealChild) return
        chatSettings.toggleClassName('element-hide', true)
        chatSettings.toggleClassName('element-show', false)

        widget.attribute.revealChild = false
        chatSettings.css = `margin-top: -${chatSettings.get_allocated_height()}px;`
      },
      toggle() {
        if (widget.attribute.revealChild) widget.attribute.hide()
        else widget.attribute.show()
      },
    },
    hscroll: 'never',
    vscroll: 'never',
    child: chatSettings,
    setup(self: ScrollableProps) {
      self.hook(
        GeminiService,
        () => Utils.timeout(200, self.attribute.hide),
        'newMsg',
      )
      self.hook(
        GeminiService,
        () => Utils.timeout(200, self.attribute.show),
        'clear',
      )
    },
  })

  chatSettings.toggleClassName('element-show', true)
  return widget
}

export default VBox(
  { vpack: 'center' },
  Icon({
    hpack: 'center',
    icon: 'gemini-logo',
    className: 'welcome-logo',
  }),
  Settings(),
)
