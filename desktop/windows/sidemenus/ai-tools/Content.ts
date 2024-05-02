import GPTView from './gpt/View'
import GeminiView from './gemini/View'
import { setupCursorHover } from 'misc/cursorhover'

export const currentTab = Variable('gemini')

export const stackItems = [
  { 
    name: 'gemini',
    content: GeminiView,
    icon: 'google-gemini-symbolic',
    tooltipText: 'Assistant (Gemini Pro)',
  },
  {
    name: 'gpt',
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

const Button = ({ icon, name, ...props}) => Widget.Button({
  onClicked: () => currentTab.value = name,
  child: Widget.Icon(icon),
  setup: setupCursorHover,
  ...props
})

export default Widget.Box(
  { vertical: true },
  Widget.Box({ 
    hpack: 'center' ,
    children: stackItems.map(({ 
      icon, name, tooltipText 
    }) => Button({ icon, name, tooltipText }))
  }), Stack
)
