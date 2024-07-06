import wallpaper from 'service/wallpaper'

import Home from './home'

import Avatar from './Avatar'
import options from 'options'
import { capitalize } from 'lib/utils'

const { bio } = options.dashboard

const stackItems = [
  { name: 'home', icon: '', content: Home },
  { name: 'tasks', icon: '', content: Widget.Box() },
  { name: 'reads', icon: '', content: Widget.Box() },
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
  transition: 'slide_right',
  transitionDuration: options.transition,
  child: Widget.Box({
    vertical: true,
    className: 'sidebar',
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
      className: 'title',
      label: `Good morning, ${capitalize(Utils.USER)}`
    })
  )
})

const Bio = Widget.Label({ xalign: 0, label: bio.bind(), className: 'bio' })
const Main = Widget.Box({ vertical: true, className: 'main' }, Header, Bio, Stack)

export default Widget.Window({
  visible: false,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
  child: Widget.Box({ className: 'dashboard' }, Sidebar, Main)
}).keybind('Escape', () => App.closeWindow('dashboard'))
