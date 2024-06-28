import Avatar from './Avatar'
import { capitalize } from 'lib/utils'

const stackItems = [
  { name: 'home', icon: '', content: Widget.Box() },
  { name: 'ledger', icon: '', content: Widget.Box() },
  { name: 'events', icon: '', content: Widget.Box() },
  { name: 'tasks', icon: '', content: Widget.Box() },
  { name: 'goals', icon: '', content: Widget.Box() },
  { name: 'life', icon: '', content: Widget.Box() },
]

const Stack = Widget.Stack({
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

const TabBar = Widget.Box({
  vertical: true,
  className: 'tab-bar',
  children: Array.from({ length: stackItems.length }, (_, i) => i).map(TabButton)
})

const Header = Widget.Overlay({
  overlay: Avatar,
  className: 'header',
  child: Widget.Box({ vertical: true },
    Widget.Box({
      className: 'cover',
      css: `
        background-size: cover;
        background-image: url('${Utils.HOME}/.config/background');`
    }),
    Widget.Label({
      xalign: 0,
      label: `${capitalize(Utils.USER)}'s Dashboard`
    })
  )
})

const Content = Widget.Scrollable({
  vscroll: 'automatic',
  child: Widget.Box(
    { vertical: true, className: 'dashboard' },
    Header, Widget.Box({ className: 'content' }, TabBar, Stack)
  )
})

export default Widget.Window({
  child: Content,
  visible: false,
  name: 'dashboard',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'right', 'left'],
}).keybind('Escape', () => App.closeWindow('dashboard'))
