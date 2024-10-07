import { type BoxProps } from 'types/widgets/box'
import { type LabelProps } from 'types/widgets/label'
import { type ButtonProps } from 'types/widgets/button'
import options from 'options'

const { transition } = options
const { Box, Button, Label, Revealer } = Widget

export const ConfigToggle = ({
  name,
  desc = '',
  initValue,
  expandWidget = true,
  onChange = () => { },
  extraSetup = () => { },
  ...props
}) => {
  const enabled = Variable(initValue)
  const toggleIcon = Label({
    label: `${enabled.value ? '' : ''}`,
  }).hook(enabled, (self: LabelProps) => {
    self.toggleClassName('switch-fg-toggling-false', false)
    if (!enabled.value) {
      self.label = ''
      self.toggleClassName('txt-poof', true)
    }
    else Utils.timeout(1, () => {
      toggleIcon.label = ''
      toggleIcon.toggleClassName('txt-poof', false)
    })
  })

  const toggleButtonIndicator = Box({
    vpack: 'center',
    hpack: 'start',
    homogeneous: true,
    className: `switch-fg ${enabled.value ? 'switch-fg-true' : ''}`,
  }, toggleIcon)
    .hook(enabled, (self: BoxProps) => self.toggleClassName('switch-fg-true', enabled.value))

  const toggleButton = Box({
    hpack: 'end',
    homogeneous: true,
    className: `switch-bg ${enabled.value ? 'switch-bg-true' : ''}`,
  }, toggleButtonIndicator)
    .hook(enabled, (self: BoxProps) => self.toggleClassName('switch-bg-true', enabled.value))

  const widgetContent = Box({
    tooltipText: desc,
    className: 'configtoggle-box',
    children: [
      Label(name),
      expandWidget ? Box({ hexpand: true }) : null,
      toggleButton,
    ]
  })
  const interactionWrapper = Button({
    attribute: {
      enabled: enabled,
      toggle() {
        enabled.value = !enabled.value
        onChange(interactionWrapper, enabled.value)
      }
    },
    child: widgetContent,
    onClicked(self: ButtonProps) { self.attribute.toggle(self) },
    cursor: 'pointer',
    setup(self: ButtonProps) {
      self.connect('pressed', () => { // mouse down
        toggleIcon.toggleClassName('txt-poof', true)
        toggleIcon.toggleClassName('switch-fg-true', false)
        if (!enabled.value) toggleIcon.toggleClassName('switch-fg-toggling-false', true)
      })
      extraSetup(self)
    },
    ...props,
  })
  interactionWrapper.enabled = enabled
  return interactionWrapper
}

export const ConfigSegmentedSelection = ({
  desc = '',
  options = [
    { name: 'Option 1', value: 0 },
    { name: 'Option 2', value: 1 }
  ],
  initIndex = 0,
  onChange,
  ...props
}) => {
  let lastSelected = initIndex

  const widget = Box({
    tooltipText: desc,
    className: 'segment-container',
    children: options.map((option, id) => {
      const selectedIcon = Revealer({
        transition: 'slide_right',
        revealChild: id == initIndex,
        transitionDuration: transition,
      }, Label(''))

      return Button({
        cursor: 'pointer',
        className: `segment-btn ${id == initIndex ? 'segment-btn-enabled' : ''}`,
        onClicked(self: ButtonProps) {
          const kids = widget.get_children()
          kids[lastSelected].toggleClassName('segment-btn-enabled', false)
          kids[lastSelected].get_children()[0].get_children()[0].revealChild = false
          lastSelected = id
          self.toggleClassName('segment-btn-enabled', true)
          selectedIcon.revealChild = true
          onChange(option.value, option.name)
        }
      }, Box({ hpack: 'center' }, selectedIcon, Label(option.name)))
    }),
    ...props,
  })
  return widget
}
