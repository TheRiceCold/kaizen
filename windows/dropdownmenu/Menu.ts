import { TabNavigator, ContentStack } from './imports'
import options from 'options'

const Header = Widget.Box({
  hexpand: true,
  className: 'header',
  children: [
    TabNavigator,
    Widget.Label({
      hpack: 'end',
      hexpand: true,
      className: 'tab-label',
      label: options.menu.tab.bind()
    })
  ]
})

export default Widget.Box({
  vertical: true,
  className: 'menu',
  children: [ Header, ContentStack ],
})
