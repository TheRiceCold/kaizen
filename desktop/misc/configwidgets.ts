import { setupCursorHover } from './cursorhover'

export const ConfigToggle = ({
  icon, 
  name, 
  desc = '', 
  initValue,
  expandWidget = true,
  onChange = () => { }, 
  extraSetup = () => { },
  ...props
}) => {
  const enabled = Variable(initValue)
  const toggleIcon = Widget.Label({
    className: `icon-material txt-bold ${enabled.value ? '' : 'txt-poof'}`,
    label: `${enabled.value ? 'check' : ''}`,
  }).hook(enabled, (self) => {
    self.toggleClassName('switch-fg-toggling-false', false)
    if (!enabled.value) {
      self.label = ''
      self.toggleClassName('txt-poof', true)
    }
    else Utils.timeout(1, () => {
      toggleIcon.label = 'check'
      toggleIcon.toggleClassName('txt-poof', false)
    })
  })

  const toggleButtonIndicator = Widget.Box({
    vpack: 'center',
    hpack: 'start',
    homogeneous: true,
    child: toggleIcon,
    className: `switch-fg ${enabled.value ? 'switch-fg-true' : ''}`,
  }).hook(enabled, self => self.toggleClassName('switch-fg-true', enabled.value))

  const toggleButton = Widget.Box({
    hpack: 'end',
    homogeneous: true,
    children: [toggleButtonIndicator],
    className: `switch-bg ${enabled.value ? 'switch-bg-true' : ''}`,
  }).hook(enabled, self => self.toggleClassName('switch-bg-true', enabled.value))

  const widgetContent = Widget.Box({
    tooltipText: desc,
    className: 'configtoggle-box',
    children: [
      (icon !== undefined ? Widget.Icon(icon) : null),
      (name !== undefined ? Widget.Label(name) : null),
      expandWidget ? Widget.Box({ hexpand: true }) : null,
      toggleButton,
    ]
  })
  const interactionWrapper = Widget.Button({
    attribute: {
      enabled: enabled,
      toggle() {
        enabled.value = !enabled.value
        onChange(interactionWrapper, enabled.value)
      }
    },
    child: widgetContent,
    onClicked: (self) => self.attribute.toggle(self),
    setup(self) {
      setupCursorHover(self)
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

  const widget = Widget.Box({
    tooltipText: desc,
    className: 'segment-container',
    children: options.map((option, id) => {
      const selectedIcon = Widget.Revealer({
        transition: 'slide_right',
        revealChild: id == initIndex,
        child: Widget.Icon('check-symbolic'),
        transitionDuration: options.transition.value,
      })

      return Widget.Button({
        setup: setupCursorHover,
        className: `segment-btn ${id == initIndex ? 'segment-btn-enabled' : ''}`,
        child: Widget.Box({
          hpack: 'center',
          className: 'spacing-h-5',
          children: [ selectedIcon, Widget.Label(option.name) ]
        }),
        onClicked(self) {
          const kids = widget.get_children()
          kids[lastSelected].toggleClassName('segment-btn-enabled', false)
          kids[lastSelected].get_children()[0].get_children()[0].revealChild = false
          lastSelected = id
          self.toggleClassName('segment-btn-enabled', true)
          selectedIcon.revealChild = true
          onChange(option.value, option.name)
        }
      })
    }),
    ...props,
  })
  return widget
}

export const ConfigMulipleSelection = ({
  desc = '',
  optionsArr = [
    [{ name: 'Option 1', value: 0 }, { name: 'Option 2', value: 1 }],
    [{ name: 'Option 3', value: 0 }, { name: 'Option 4', value: 1 }],
  ],
  initIndex = [0, 0],
  onChange,
  ...props
}) => {
  let lastSelected = initIndex // eslint-disable-line @typescript-eslint/no-unused-vars

  const widget = Widget.Box({
    tooltipText: desc,
    className: 'multipleselection-container spacing-v-3',
    vertical: true,
    children: optionsArr.map((options, grp) => Widget.Box({
      hpack: 'center',
      children: options.map((option, id) => Widget.Button({
        setup: setupCursorHover,
        className: `multipleselection-btn ${id == initIndex[1] && grp == initIndex[0] ? 'multipleselection-btn-enabled' : ''}`,
        label: option.name,
        onClicked(self) {
          const kidsg = widget.get_children()
          const kids = kidsg.flatMap(widget => widget.get_children())
          kids.forEach(kid => kid.toggleClassName('multipleselection-btn-enabled', false))
          lastSelected = id
          self.toggleClassName('multipleselection-btn-enabled', true)
          onChange(option.value, option.name)
        }
      })),
    })),
    ...props,
  })
  return widget
}
