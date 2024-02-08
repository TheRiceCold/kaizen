import { FontIcon } from '../../../misc/main.js'
import { ContentStack, contents, currentTabId } from '../exports.js'

function switchTab(id) {
  const allTabs = Tabs.get_children()
  const tabButton = allTabs[id]
  allTabs[currentTabId].toggleClassName('tab-active', false)
  allTabs[id].toggleClassName('tab-active', true)
  ContentStack.shown = contents[id].name
  if (tabButton) {
    const buttonWidth = tabButton.get_allocated_width()
    const highlightWidth = tabButton.get_children()[0].get_allocated_width()
    // indicator.css = `
    //   font-size: ${id}px; 
    //   padding: 0 ${(buttonWidth - highlightWidth) / 2}px;`
  }
  currentTabId = id
}

const TabButton = id => Widget.Button({
  className: 'icon-button',
  onClicked: () => switchTab(id),
  child: FontIcon(contents[id].icon)
})

const Tabs = Widget.Box({
  homogeneous: true,
  children: contents.map((_, id) => TabButton(id))
})

export default Widget.Box({
  vertical: true,
  hexpand: true,
  children: [ Tabs ]
})
