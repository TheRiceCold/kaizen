import GPTView from './gpt/View'
import GPTCommands from './gpt/Commands'
import GPTSendMessage from './gpt/SendMessage'

import GeminiView from './gemini/View'
import GeminiCommands from './gemini/Commands'
import GeminiSendMessage from './gemini/SendMessage'

import MenuRevealer from '../MenuRevealer'
import IconTabContainer from './IconTabContainer'
import Textbox, { ChatPlaceholder } from './Textbox'

import options from 'options'

export let currentApiId: number = 0
export const setCurrentApiId = (id: number) => (currentApiId = id)

export const APIS = [
  {
    contentWidget: GeminiView,
    commandBar: GeminiCommands,
    sendCommand: GeminiSendMessage,
    name: 'Assistant (Gemini Pro)',
    placeholderText: 'Message Gemini...',
    tabIcon: Widget.Icon({ hpack: 'center', icon: 'google-gemini-symbolic' }),
  },
  {
    contentWidget: GPTView,
    commandBar: GPTCommands,
    sendCommand: GPTSendMessage,
    name: 'Assistant (GPTs)',
    tabIcon: Widget.Icon({ hpack: 'center', icon: 'openai-symbolic' }),
    placeholderText: 'Message the model...',
  },
]

const ContentStack = IconTabContainer({
  tabSwitcherClassName: 'sidebar-icontabswitcher',
  iconWidgets: APIS.map((api) => api.tabIcon),
  names: APIS.map((api) => api.name),
  children: APIS.map((api) => api.contentWidget),
  onChange: (self, id) => {
    CommandStack.shown = APIS[id].name
    ChatPlaceholder.label = APIS[id].placeholderText
    setCurrentApiId(id)
  },
})

const CommandStack = Widget.Stack({
  transition: 'slide_up_down',
  transitionDuration: options.transition,
  children: APIS.reduce((acc, api) => {
    acc[api.name] = api.commandBar
    return acc
  }, {}),
})

export default MenuRevealer('apis', [ContentStack, CommandStack, Textbox])
