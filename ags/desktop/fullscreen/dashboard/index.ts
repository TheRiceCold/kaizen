import { type ButtonProps } from 'types/widgets/button'
import wallpaper from 'service/wallpaper'

import { ButtonLabel, VBox } from 'widgets'

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

const TabButton = (i: number) => ButtonLabel(
  `${pages[i].icon}  ${capitalize(pages[i].name)}`,
  () => activePage.value = pages[i].name,
  { xalign: 0 },
).hook(activePage, (self: ButtonProps) => {
  self.toggleClassName('active', pages[i].name === activePage.value)
})

const Sidebar = Widget.Revealer({
  revealChild: true,
  className: 'sidebar',
  transition: 'slide_right',
  transitionDuration: options.transition,
}, VBox([
  Widget.Label({
    className: 'user',
    label: ` ${capitalize(Utils.USER)}'s Dashboard `
  }),
  ...Array.from({ length: pages.length }, (_, i) => i).map(TabButton)
]))

const SidebarButton = ButtonLabel('󰍜', () => {
  Sidebar.revealChild = !Sidebar.revealChild
}, { hpack: 'start', vpack: 'start', className: 'sidebar-button' })

const Dashboard = Widget.Box(
  { className: 'dashboard' }, Sidebar,
  VBox(
    { className: 'main' },
    Widget.Overlay({
      passThrough: true,
      className: 'header',
      overlays: [ SidebarButton, Avatar ],
    }, VBox(
      { className: 'cover' },
      Widget.Box({
        className: 'cover-img',
        css: wallpaper.bind('wallpaper').as(
          (wp: string) => `
          min-height: 200px;
          background-size: cover;
          background-image: url('${wp}');`)
      }),
    )), Stack)
)

export default Widget.Window({
  visible: false,
  child: Dashboard,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
}).keybind('Escape', () => App.closeWindow('dashboard'))
