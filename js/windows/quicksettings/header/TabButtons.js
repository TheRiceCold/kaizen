import { FontIcon, NavigationIndicator } from '../../../misc/main.js'
import { ContentStack, contents, currentTabId } from '../exports.js'

function switchTab(id) {
  const allTabs = Tabs.get_children()
  const tabButton = allTabs[id]
  ContentStack.shown = contents[id].name
  if (tabButton)
    Indicator.css = `font-size: ${id}px;`
  currentTabId = id
}

const TabButton = id => Widget.Button({
  className: 'tab-button',
  onClicked: () => switchTab(id),
  child: FontIcon(contents[id].icon)
})

const Tabs = Widget.Box({
  homogeneous: true,
  children: contents.map((_, id) => TabButton(id))
})

const Indicator = NavigationIndicator(
  contents.length, 
  false, { className: 'tab-indicator' }
)

export default Widget.Box({
  vertical: true,
  children: [ Tabs, Indicator ]
})
