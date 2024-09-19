import { type ButtonProps } from 'types/widgets/button'

import { VBox } from 'widgets'
import GeminiView from './gemini/View'
import { ChatPlaceholder } from './Textbox'

import options from 'options'
import { capitalize } from 'lib/utils'

export const currentTab = Variable('gemini')

export const stackItems = [
  {
    name: 'gemini',
    content: GeminiView,
    icon: 'google-gemini-symbolic',
    tooltipText: 'Assistant (Gemini Pro)',
    placeholderText: 'Message Gemini...',
  },
]

export const Stack = Widget.Stack({
  className: 'stack-list',
  shown: currentTab.bind(),
  transition: 'slide_left_right',
  transitionDuration: options.transition,
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

const Button = ({ icon, name, ...props }) => Widget.Button({
  cursor: 'pointer',
  onClicked() {
    const stackItem = stackItems.find(item => item.name === name)
    ChatPlaceholder.label = stackItem && stackItem.placeholderText
    currentTab.value = name
  }, ...props
}, Widget.Box([
  Widget.Label(capitalize(name)),
  Widget.Icon(icon)
])).hook(currentTab, (self: ButtonProps) => {
  const isActive = currentTab.value === name
  self.toggleClassName('active', isActive)
})

const TabButtons = Widget.Box(
  { className: 'tab-buttons' },
  Widget.Box(
    { hexpand: true, hpack: 'center' },
    ...stackItems.map(({
      content: _1, placeholderText: _2, ...props
    }) => Button(props))
  )
)

export default VBox([TabButtons, Stack])
