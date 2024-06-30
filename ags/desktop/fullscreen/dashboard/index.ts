import wallpaper from 'service/wallpaper'

import Home from './home'

import Avatar from './Avatar'
import options from 'options'
import { capitalize } from 'lib/utils'

const { bio } = options.dashboard

const stackItems = [
  { name: 'home', icon: '', content: Home },
  { name: 'ledger', icon: '', content: Widget.Box() },
  { name: 'events', icon: '', content: Widget.Box() },
  { name: 'tasks', icon: '', content: Widget.Box() },
  { name: 'goals', icon: '', content: Widget.Box() },
  { name: 'life', icon: '', content: Widget.Box() },
]

const Stack = Widget.Stack({
  className: 'content',
  transition: 'slide_up_down',
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

const TabButton = index => Widget.Button({
  cursor: 'pointer',
  onClicked() { Stack.shown = stackItems[index].name },
  child: Widget.Label({
    xalign: 0,
    label: stackItems[index].icon+'  '+capitalize(stackItems[index].name),
  })
})

const SideMenu = Widget.Revealer({
  transition: 'slide_right',
  transitionDuration: options.transition,
  child: Widget.Box({
    vertical: true,
    className: 'sidemenu',
    children: Array.from({ length: stackItems.length }, (_, i) => i).map(TabButton)
  })
})

const MenuButton = Widget.Button({
  label: '󰍜',
  hpack: 'start',
  vpack: 'start',
  cursor: 'pointer',
  className: 'menu-button',
  onClicked() { SideMenu.revealChild = !SideMenu.revealChild }
})

const Header = Widget.Overlay({
  passThrough: true,
  className: 'header',
  overlays: [ MenuButton, Avatar ],
  child: Widget.Box({ vertical: true },
    Widget.Box({
      className: 'cover',
      css: wallpaper.bind('wallpaper').as(
        (wp: string) => `
        min-height: 200px;
        background-size: cover;
        background-image: url('${wp}');`)
    }),
    Widget.Label({
      xalign: 0,
      className: 'user-welcome',
      label: `${capitalize(Utils.USER)}'s Dashboard`
    })
  )
})

const Main = Widget.Scrollable({
  hexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box(
    { vertical: true, className: 'main' },
    Header,
    Widget.Label({ xalign: 0, label: bio.bind(), className: 'bio' }),
    Stack
  )
})

export default Widget.Window({
  visible: false,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
  child: Widget.Box({ className: 'dashboard', hexpand: true }, SideMenu, Main)
}).keybind('Escape', () => App.closeWindow('dashboard'))
