import { FontIcon, NavigationIndicator } from '../../../misc/main.js'
import { ContentStack, contents, currentTabId } from '../exports.js'

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

export default Widget.Box({
  vertical: true,
  children: [ Buttons, Indicator ]
})
