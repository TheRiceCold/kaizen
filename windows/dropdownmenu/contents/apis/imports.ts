import { geminiView, geminiCommands, sendMessage as geminiSendMessage, geminiTabIcon } from './gemini'
import { chatGPTView, chatGPTCommands, sendMessage as chatGPTSendMessage, chatGPTTabIcon } from './chatgpt'

let currentApiId = 0
const setCurrentTab = (id: number) => currentApiId = id

const APIS = [
  {
    name: 'Assistant (Gemini Pro)',
    sendCommand: geminiSendMessage,
    contentWidget: geminiView,
    commandBar: geminiCommands,
    tabIcon: geminiTabIcon,
    placeholderText: 'Message Gemini...',
  },
  {
    name: 'Assistant (ChatGPT 3.5)',
    sendCommand: chatGPTSendMessage,
    contentWidget: chatGPTView,
    commandBar: chatGPTCommands,
    tabIcon: chatGPTTabIcon,
    placeholderText: 'Message ChatGPT...',
  }
]

const apiContentStack = Widget.Stack({
  vexpand: true,
  transitionDuration: 160,
  transition: 'slide_left_right',
  children: APIS.reduce((acc, api) => {
    acc[api.name] = api.contentWidget
    return acc
  }, {}),
})

const apiCommandStack = Widget.Stack({
  transitionDuration: 160,
  transition: 'slide_up_down',
  children: APIS.reduce((acc, api) => {
    acc[api.name] = api.commandBar
    return acc
  }, {}),
})

export {
  APIS,
  currentApiId,
  setCurrentTab,
  apiContentStack,
  apiCommandStack,
}
