import GPTView from './gpt/View'
import GeminiView from './gemini/View'
import { ChatPlaceholder } from './Textbox'

import { capitalize } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

export const currentTab = Variable('gemini')

export const stackItems = [
  {
    name: 'gemini',
    content: GeminiView,
    icon: 'google-gemini-symbolic',
    tooltipText: 'Assistant (Gemini Pro)',
    placeholderText: 'Message Gemini...',
  },
  {
    name: 'chatGPT',
    content: GPTView,
    icon: 'openai-symbolic',
    tooltipText: 'Assistant (GPTs)',
    placeholderText: 'Message the model...',
  }
]

export const Stack = Widget.Stack({
  className: 'stack-list',
  shown: currentTab.bind(),
  transition: 'slide_left_right',
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

const Button = ({ icon, name, ...props }) => Widget.Button({
  child: Widget.Box([
    Widget.Label(capitalize(name)),
    Widget.Icon(icon)
  ]),
  attribute: { name },
  onClicked() {
    const stackItem = stackItems.find(item => item.name === name)
    ChatPlaceholder.label = stackItem.placeholderText
    currentTab.value = name
  },
  setup: setupCursorHover,
  ...props
}).hook(currentTab, self => {
  const isActive = currentTab.value === self.attribute.name
  self.toggleClassName('active', isActive)
})

const TabButtons = Widget.Box(
  { className: 'tab-buttons' },
  Widget.Box({
    hexpand: true,
    hpack: 'center',
    children: stackItems.map(({
      content: _1, placeholderText: _2, ...props
    }) => Button(props))
  })
)

export default Widget.Box({ vertical: true }, TabButtons, Stack)
