import { type ButtonProps } from 'types/widgets/button'
import wallpaper from 'service/wallpaper'

import { ButtonLabel, VBox } from 'widgets'

import Home from './home'
import Tasks from './tasks'

import Avatar from './Avatar'
import { capitalize } from 'lib/utils'

const {
  Box, Label, Revealer,
  Stack, Overlay, Window
} = Widget

const showSidebar = Variable(true)
const activePage = Variable('home')

const pages = [
  { name: 'home', icon: '', content: Home },
  { name: 'tasks', icon: '', content: Tasks },
  { name: 'journal', icon: '', content: Box() },
  { name: 'budget', icon: '', content: Box() },
  { name: 'events', icon: '', content: Box() },
  { name: 'goals', icon: '', content: Box() },
  { name: 'life', icon: '', content: Box() },
]

const Dashboard = Box(
  { className: 'dashboard' },
  // Sidebar
  Revealer({
    className: 'sidebar',
    transition: 'slide_right',
    revealChild: showSidebar.bind(),
  }, VBox([
    Label({
      className: 'user',
      label: ` ${capitalize(USER)}'s Dashboard `
    }),
    // Sidebar Items
    ...Array.from({ length: pages.length }, (_, i) => i)
      .map((i: number) => ButtonLabel(
        `${pages[i].icon}  ${capitalize(pages[i].name)}`,
        () => activePage.value = pages[i].name,
        { xalign: 0 },
      ).hook(activePage, (self: ButtonProps) => {
        self.toggleClassName('active', pages[i].name === activePage.value)
      }))
  ])),

  // Main Content
  VBox(
    { className: 'main' },
    // Header
    Overlay({
      passThrough: true,
      className: 'header',
      overlays: [
        // Sidebar Button
        ButtonLabel('󰍜', () => {
          showSidebar.value = !showSidebar.value
        }, { hpack: 'start', vpack: 'start', className: 'sidebar-button' }),

        Avatar
      ],
    },

    // Cover Image
    VBox(
      { className: 'cover' },
      Box({
        className: 'cover-img',
        css: wallpaper.bind('wallpaper').as(
          (wp: string) => `
          min-height: 200px;
          background-size: cover;
          background-image: url('${wp}');`)
      }),
    )),

    // Pages
    Stack({
      className: 'page',
      shown: activePage.bind(),
      transition: 'slide_up_down',
      children: pages.reduce((acc, item) => {
        acc[item.name] = item.content
        return acc
      }, {}),
    })
  )
)

export default Window({
  visible: false,
  child: Dashboard,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
}).keybind('Escape', () => App.closeWindow('dashboard'))
