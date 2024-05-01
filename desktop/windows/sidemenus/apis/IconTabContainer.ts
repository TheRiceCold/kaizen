import { setupCursorHover } from 'misc/cursorhover'

export default ({
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
    children: iconWidgets.map((icon, i) => Widget.Button({
      child: icon,
      className: 'tab-icon',
      tooltipText: names[i],
      setup: setupCursorHover,
      onClicked: () => (shownIndex.value = i),
    })),
  }).hook(shownIndex, (self) => {
    self.children[previousShownIndex].toggleClassName('tab-icon-active', false)
    self.children[shownIndex.value].toggleClassName('tab-icon-active', true)
    previousShownIndex = shownIndex.value
  })

  const tabSection = Widget.EventBox({
    onScrollUp: () => mainBox.prevTab(),
    onScrollDown: () => mainBox.nextTab(),
    child: Widget.Box({ vertical: true, hexpand: true, child: tabs }),
  })

  const contentStack = Widget.Stack({
    transition: 'slide_left_right',
    children: children.reduce((acc, currentValue, index) => {
      acc[index] = currentValue
      return acc
    }, {})
  }).hook(shownIndex, self => (self.shown = `${shownIndex.value}`))

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
      self.hook(shownIndex, self => onChange(self, shownIndex.value))
    },
    ...props,
  })

  mainBox.nextTab = () => (shownIndex.value = Math.min(shownIndex.value + 1, count - 1))
  mainBox.prevTab = () => (shownIndex.value = Math.max(shownIndex.value - 1, 0))
  mainBox.cycleTab = () => (shownIndex.value = (shownIndex.value + 1) % count)
  mainBox.shown = shownIndex

  return mainBox
}
