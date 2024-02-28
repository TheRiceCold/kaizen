import { TabNavigator, ContentStack, contents, currentTabId } from './imports'

const Header = Widget.Box({
  hexpand: true,
  className: 'header',
  children: [
    TabNavigator,
    Widget.Label({
      hpack: 'end',
      hexpand: true,
      // label: contents[currentTabId].bind(v => v.name),
    })
  ]
})

export default Widget.Box({
  vertical: true,
  className: 'menu',
  children: [ Header, ContentStack ],
})
