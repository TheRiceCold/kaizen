import wallpaper from 'service/wallpaper'

import Home from './home'
import Tasks from './tasks'

import Avatar from './Avatar'
import options from 'options'
import { capitalize } from 'lib/utils'

const activePage = Variable('home')

const pages = [
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
  shown: activePage.bind(),
  transition: 'slide_up_down',
  children: pages.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

const TabButton = (i: number)=> Widget.Button({
  xalign: 0, cursor: 'pointer',
  onClicked() { activePage.value = pages[i].name },
  child: Widget.Label(`${pages[i].icon}  ${capitalize(pages[i].name)}`),
}).hook(activePage, self => {
  self.toggleClassName('active', pages[i].name === activePage.value)
})

const Sidebar = Widget.Revealer({
  revealChild: true,
  className: 'sidebar',
  transition: 'slide_right',
  transitionDuration: options.transition,
  child: Widget.Box({vertical: true},
    Widget.Label({
      className: 'user',
      label: ` ${capitalize(Utils.USER)}'s Dashboard `
    }),
    ...Array.from({ length: pages.length }, (_, i) => i).map(TabButton)
  )
})

const MenuButton = Widget.Button({
  label: '󰍜',
  hpack: 'start',
  vpack: 'start',
  cursor: 'pointer',
  className: 'menu-button',
  onClicked() {
    Sidebar.revealChild = !Sidebar.revealChild
  }
})

const Dashboard = Widget.Box(
  { className: 'dashboard' }, Sidebar,
  Widget.Box(
    { vertical: true, className: 'main' },
    Widget.Overlay({
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
    }), Stack)
)

export default Widget.Window({
  visible: false,
  child: Dashboard,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
}).keybind('Escape', () => App.closeWindow('dashboard'))
