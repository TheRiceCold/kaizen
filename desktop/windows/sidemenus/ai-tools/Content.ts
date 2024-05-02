import GPTView from './gpt/View'
import GeminiView from './gemini/View'

import { setupCursorHover } from 'misc/cursorhover'

export const currentTab = Variable('gemini')

export const stackItems = [
  { 
    name: 'Gemini',
    content: GeminiView,
    icon: 'google-gemini-symbolic',
    tooltipText: 'Assistant (Gemini Pro)',
  },
  {
    name: 'ChatGPT',
    content: GPTView,
    icon: 'openai-symbolic',
    tooltipText: 'Assistant (GPTs)',
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
  child: Widget.Box([ Widget.Label(name), Widget.Icon(icon) ]),
  onClicked: () => currentTab.value = name,
  setup: setupCursorHover,
  attribute: { name },
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
    children: stackItems.map(({ content: _, ...props }) => Button(props))
  })
)

export default Widget.Box({ vertical: true }, TabButtons, Stack)
