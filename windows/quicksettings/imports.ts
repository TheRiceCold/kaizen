import Indicator from 'misc/navIndicator'
import Apis from './contents/apis'
import Utils from './contents/utils'
import Settings from './contents/settings'

let currentTabId = 0
const contents = [
  {
    icon: '',
    name: 'settings',
    content: Settings
  },
  {
    icon: '󱍓',
    name: 'utilities',
    content: Utils,
  },
  {
    icon: '󰚩',
    name: 'apis',
    content: Apis,
  },
]

const ContentStack = Widget.Stack({
  vexpand: true,
  transition: 'slide_left_right',
  children: contents.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

function switchTab(id) {
  const buttonList = buttons.get_children()
  const selectedButton = buttonList[id]
  ContentStack.shown = contents[id].name
  if (selectedButton)
    Indicator.css = `font-size: ${id}px;`
  currentTabId = id
}

const buttons = Widget.Box({
  children: contents.map((_, id) => Widget.Button({
    className: 'tab-button',
    onClicked: () => switchTab(id),
    child: Widget.Label({ label: contents[id].icon })
  })),
})

const indicator = Indicator( contents.length, false, { className: 'tab-indicator' })

const TabNavigator = Widget.Box({
  vertical: true,
  children: [ buttons, indicator ]
})

export {
  switchTab,
  ContentStack,
  TabNavigator,
  contents,
  currentTabId,
}
