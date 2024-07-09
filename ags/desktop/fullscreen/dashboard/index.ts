import wallpaper from 'service/wallpaper'

import Home from './home'
import Tasks from './tasks'

import Avatar from './Avatar'
import options from 'options'
import { capitalize } from 'lib/utils'

const stackItems = [
  { name: 'home', icon: '', content: Home },
  { name: 'tasks', icon: '', content: Tasks },
  { name: 'journal', icon: '', content: Widget.Box() },
  { name: 'budget', icon: '', content: Widget.Box() },
  { name: 'events', icon: '', content: Widget.Box() },
  { name: 'goals', icon: '', content: Widget.Box() },
  { name: 'life', icon: '', content: Widget.Box() },
]

const Stack = Widget.Stack({
  className: 'page',
  transition: 'slide_up_down',
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

const TabButton = index => Widget.Button({
  hpack: 'start',
  cursor: 'pointer',
  onClicked() { Stack.shown = stackItems[index].name },
  label: stackItems[index].icon+'  '+capitalize(stackItems[index].name),
})

const Sidebar = Widget.Revealer({
  className: 'sidebar',
  transition: 'slide_right',
  transitionDuration: options.transition,
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Label({
        className: 'user',
        label: `${capitalize(Utils.USER)}'s Dashboard`
      })
    ].concat(Array.from({ length: stackItems.length }, (_, i) => i).map(TabButton))
  })
})

const MenuButton = Widget.Button({
  label: '󰍜',
  hpack: 'start',
  vpack: 'start',
  cursor: 'pointer',
  className: 'menu-button',
  onClicked() { Sidebar.revealChild = !Sidebar.revealChild }
})

const Header = Widget.Overlay({
  passThrough: true,
  className: 'header',
  overlays: [ MenuButton, Avatar ],
  child: Widget.Box(
    { className: 'cover', vertical: true },
    Widget.Box({
      className: 'cover-img',
      css: wallpaper.bind('wallpaper').as(
        (wp: string) => `
        min-height: 200px;
        background-size: cover;
        background-image: url('${wp}');`)
    }),
  )
})

const Main = Widget.Box({ vertical: true, className: 'main' }, Header, Stack)

export default Widget.Window({
  visible: false,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
  child: Widget.Box({ className: 'dashboard' }, Sidebar, Main)
}).keybind('Escape', () => App.closeWindow('dashboard'))
