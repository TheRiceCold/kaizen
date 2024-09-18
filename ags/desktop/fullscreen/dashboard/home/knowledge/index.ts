import Header from './header'

import items from './items'

const lastTab = Variable('quotes')
const activeTab = Variable('quotes')

export default Widget.Box({ className: 'knowledge' },
  Widget.Overlay({
    passThrough: true,
    overlay: Header(activeTab, lastTab),
  }, Widget.Stack({
    transition: 'slide_left_right' ,
    children: items.reduce((acc, item) => {
      acc[item.title] = 'currentValue' in item
        ? item.content(item.icon, item.currentValue)
        : item.content(lastTab) // Filter Tab

      return acc
    }, {})
  }).hook(activeTab, (self: typeof Widget.Stack) => self.shown = activeTab.value)))
