import { Utilities, Apis, Settings } from './contents'
import icons from 'data/icons'
import options from 'options'
import { capitalize } from 'lib/utils'

const contents = [
  { icon: '󱍓', name: 'utilities', content: Utilities },
  { icon: '󰚩', name: 'apis', content: Apis },
  { icon: '', name: 'settings', content: Settings },
]

const NavButtons = Widget.Box(
  contents.map((_, id: number) => Widget.Button({
    className: 'tab-button',
    label: contents[id].icon,
    onClicked: () => ContentStack.shown = contents[id].name,
  })
))

const ContentStack = Widget.Stack({
  vexpand: true,
  transition: 'slide_left_right',
  children: contents.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

const Nav = Widget.Box({
  hexpand: true,
  className: 'header',
  children: [
    NavButtons,
    Widget.Box({
      hpack: 'end',
      hexpand: true,
      spacing: options.theme.spacing * 0.5,
      children: [
        Widget.Label({
          className: 'tab-label',
          label: options.dropmenu.tab.bind().as(v => capitalize(v))
        }),
        Widget.Button({ child: Widget.Icon(icons.ui.refresh) }),
        Widget.Button({ child: Widget.Icon(icons.ui.pin) }),
      ]
    })
  ]
})

export default Widget.Box({
  vertical: true,
  className: 'dropmenu',
  children: [ Nav, ContentStack ],
})
