import { Menu, MenuItemLabel as Item } from 'widgets'

// TODO: Adding Dashboard Widgets
export default widget => Menu(widget, [
  Item('󰜬 Add Widgets', [
    Item(' Time', () => { }),
    Item(' Player', () => { }),
    Item('󱞁 Notes', () => { }),
    Item(' System', () => { }),
    Item(' Weather', () => { }),
    Item('󰧑 Knowledge', () => { }),
  ])
], { type: 'event' })
