import { FontIcon, NavigationIndicator } from '../../misc/main.js'
import Apis from './tab-contents/apis/main.js'
import Settings from './tab-contents/settings/main.js'
import Utilities from './tab-contents/utilities/main.js'

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
    content: Utilities,
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
  const buttonList = Buttons.get_children()
  const selectedButton = buttonList[id]
  ContentStack.shown = contents[id].name
  if (selectedButton)
    Indicator.css = `font-size: ${id}px;`
  currentTabId = id
}

const Buttons = Widget.Box({
  children: contents.map((_, id) => Widget.Button({
    className: 'tab-button',
    onClicked: () => switchTab(id),
    child: FontIcon(contents[id].icon)
  })),
})

const Indicator = NavigationIndicator(
  contents.length, 
  false, { className: 'tab-indicator' }
)

const TabNavigator = Widget.Box({
  vertical: true,
  children: [ Buttons, Indicator ]
})

export { 
  switchTab,
  ContentStack, 
  TabNavigator, 
  contents,
  currentTabId,
}
