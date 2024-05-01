import { setupCursorHover } from './cursorhover'
import { DoubleRevealer, NavigationIndicator } from '.'
import options from 'options'

export const TabContainer = ({
  icons,
  names,
  children,
  className = '',
  setup = () => {},
  ...props
}) => {
  const shownIndex = Variable(0)
  let previousShownIndex = 0
  const count = Math.min(icons.length, names.length, children.length)
  const tabs = Widget.Box({
    children: Array.from({ length: count }, (_, i) =>
      Widget.Button({
        // Tab button
        className: 'tab-btn',
        setup: setupCursorHover,
        onClicked: () => (shownIndex.value = i),
        child: Widget.Box(
          { hpack: 'center', vpack: 'center' },
          Widget.Icon(icons[i]),
          Widget.Label(names[i]),
        ),
      }),
    ),
  }).hook(shownIndex, (self) => {
    self.children[previousShownIndex].toggleClassName('tab-btn-active', false)
    self.children[shownIndex.value].toggleClassName('tab-btn-active', true)
    previousShownIndex = shownIndex.value
  })

  const tabIndicatorLine = Widget.Box({
    hexpand: true,
    vertical: true,
    child: NavigationIndicator({
      count: count,
      className: 'tab-indicator',
      css: `font-size: ${shownIndex.value}px;`,
    }),
  }).hook(shownIndex, (self) => {
    self.children[0].css = `font-size: ${shownIndex.value}px;`
  })

  const tabSection = Widget.EventBox({
    onScrollUp: () => mainBox.prevTab(),
    onScrollDown: () => mainBox.nextTab(),
    child: Widget.Box(
      { vertical: true, hexpand: true },
      tabs,
      tabIndicatorLine,
    ),
  })

  const contentStack = Widget.Stack({
    transition: 'slide_left_right',
    children: children.reduce((acc, currentValue, index) => {
      acc[index] = currentValue
      return acc
    }, {}),
  }).hook(shownIndex, (self) => (self.shown = `${shownIndex.value}`))

  const mainBox = Widget.Box({
    className,
    vertical: true,
    attribute: {
      children: children,
      shown: shownIndex,
      names: names,
    },
    setup(self) {
      self.pack_start(tabSection, false, false, 0)
      self.pack_end(contentStack, true, true, 0)
      setup(self)
    },
    ...props,
  })

  mainBox.nextTab = () =>
    (shownIndex.value = Math.min(shownIndex.value + 1, count - 1))
  mainBox.prevTab = () => (shownIndex.value = Math.max(shownIndex.value - 1, 0))
  mainBox.cycleTab = () => (shownIndex.value = (shownIndex.value + 1) % count)

  return mainBox
}

export const IconTabContainer = ({
  iconWidgets,
  names,
  children,
  className = '',
  setup = () => {},
  onChange = () => {},
  tabsHpack = 'center',
  tabSwitcherClassName = '',
  ...props
}) => {
  const shownIndex = Variable(0)
  let previousShownIndex = 0
  const count = Math.min(iconWidgets.length, names.length, children.length)
  const tabs = Widget.Box({
    hpack: tabsHpack,
    homogeneous: true,
    className: tabSwitcherClassName,
    children: iconWidgets.map((icon, i) =>
      Widget.Button({
        child: icon,
        className: 'tab-icon',
        tooltipText: names[i],
        setup: setupCursorHover,
        onClicked: () => (shownIndex.value = i),
      }),
    ),
  }).hook(shownIndex, (self) => {
    self.children[previousShownIndex].toggleClassName('tab-icon-active', false)
    self.children[shownIndex.value].toggleClassName('tab-icon-active', true)
    previousShownIndex = shownIndex.value
  })

  const tabSection = Widget.EventBox({
    onScrollUp: () => mainBox.prevTab(),
    onScrollDown: () => mainBox.nextTab(),
    child: Widget.Box({
      vertical: true,
      hexpand: true,
      child: tabs,
    }),
  })

  const contentStack = Widget.Stack({
    transition: 'slide_left_right',
    children: children.reduce((acc, currentValue, index) => {
      acc[index] = currentValue
      return acc
    }, {}),
  }).hook(shownIndex, (self) => (self.shown = `${shownIndex.value}`))

  const mainBox = Widget.Box({
    className,
    vertical: true,
    attribute: {
      children: children,
      shown: shownIndex,
      names: names,
    },
    setup(self) {
      self.pack_start(tabSection, false, false, 0)
      self.pack_end(contentStack, true, true, 0)
      setup(self)
      self.hook(shownIndex, (self) => onChange(self, shownIndex.value))
    },
    ...props,
  })

  mainBox.nextTab = () =>
    (shownIndex.value = Math.min(shownIndex.value + 1, count - 1))
  mainBox.prevTab = () => (shownIndex.value = Math.max(shownIndex.value - 1, 0))
  mainBox.cycleTab = () => (shownIndex.value = (shownIndex.value + 1) % count)
  mainBox.shown = shownIndex

  return mainBox
}

export const ExpandingIconTabContainer = ({
  icons,
  names,
  children,
  className = '',
  setup = () => {},
  onChange = () => {},
  tabsHpack = 'center',
  tabSwitcherClassName = '',
  transitionDuration = options.transition.value,
  ...props
}) => {
  const shownIndex = Variable(0)
  let previousShownIndex = 0
  const count = Math.min(icons.length, names.length, children.length)
  const tabs = Widget.Box({
    hpack: tabsHpack,
    className: tabSwitcherClassName,
    children: icons.map((icon, i) => {
      const tabIcon = Widget.Icon(icon)
      const tabName = DoubleRevealer({
        duration1: 0,
        duration2: 0,
        transition2: 'crossfade',
        transition1: 'slide_right',
        child: Widget.Label(names[i]),
        revealChild: i === shownIndex.value,
      })

      const button = Widget.Button({
        tooltipText: names[i],
        setup: setupCursorHover,
        className: 'tab-icon-expandable',
        onClicked: () => (shownIndex.value = i),
        child: Widget.Box({ hpack: 'center' }, tabIcon, tabName),
      })
      button.toggleFocus = (value) => {
        tabIcon.hexpand = !value
        button.toggleClassName('tab-icon-expandable-active', value)
        tabName.toggleRevealChild(value)
      }
      return button
    }),
  }).hook(shownIndex, (self) => {
    self.children[previousShownIndex].toggleFocus(false)
    self.children[shownIndex.value].toggleFocus(true)
    previousShownIndex = shownIndex.value
  })

  const tabSection = Widget.EventBox({
    onScrollUp: () => mainBox.prevTab(),
    onScrollDown: () => mainBox.nextTab(),
    child: Widget.Box({ vertical: true, hexpand: true }, tabs),
  })

  const contentStack = Widget.Stack({
    transition: 'slide_left_right',
    transitionDuration: transitionDuration,
    children: children.reduce((acc, currentValue, index) => {
      acc[index] = currentValue
      return acc
    }, {}),
  }).hook(shownIndex, (self) => (self.shown = `${shownIndex.value}`))

  const mainBox = Widget.Box({
    className,
    vertical: true,
    attribute: {
      children: children,
      shown: shownIndex,
      names: names,
    },
    setup(self) {
      self.pack_start(tabSection, false, false, 0)
      self.pack_end(contentStack, true, true, 0)
      setup(self)
      self.hook(shownIndex, (self) => onChange(self, shownIndex.value))
    },
    ...props,
  })

  mainBox.nextTab = () =>
    (shownIndex.value = Math.min(shownIndex.value + 1, count - 1))
  mainBox.prevTab = () => (shownIndex.value = Math.max(shownIndex.value - 1, 0))
  mainBox.cycleTab = () => (shownIndex.value = (shownIndex.value + 1) % count)
  mainBox.focusName = (name) => {
    const focusIndex = names.indexOf(name)
    if (focusIndex !== -1) shownIndex.value = focusIndex
  }

  mainBox.shown = shownIndex

  return mainBox
}
