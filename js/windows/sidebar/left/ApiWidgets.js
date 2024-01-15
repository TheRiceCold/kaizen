import { Widget } from '../../../imports.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'
// APIs
import { ChatGPT } from '../../../services/main.js'
import {
  chatGPTView,
  chatGPTCommands,
  sendMessage as chatGPTSendMessage,
  chatGPTTabIcon
} from './apis/chatgpt.js'
import {
  waifuView,
  waifuCommands,
  sendMessage as waifuSendMessage,
  waifuTabIcon
} from './apis/waifu.js'

const APIS = [
  {
    name: 'ChatGPT',
    sendCommand: chatGPTSendMessage,
    contentWidget: chatGPTView,
    commandBar: chatGPTCommands,
    tabIcon: chatGPTTabIcon,
    placeholderText: 'Message ChatGPT',
  },
  {
    name: 'Waifus',
    sendCommand: waifuSendMessage,
    contentWidget: waifuView,
    commandBar: waifuCommands,
    tabIcon: waifuTabIcon,
    placeholderText: 'Enter tags',
  },
]
let currentApiId = 0
APIS[currentApiId].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', true)

export const chatEntry = Widget.Entry({
  className: 'sidebar-chat-entry',
  hexpand: true,
  connections: [[
    ChatGPT, self => {
      if (APIS[currentApiId].name != 'ChatGPT') return
      self.placeholderText = (ChatGPT.key.length > 0 ? 'Ask a question...' : 'Enter OpenAI API Key...')
    }, 'hasKey'
  ]],
  onChange: entry => {
    chatSendButton.toggleClassName('sidebar-chat-send-available', entry.text.length > 0)
  },
  onAccept: entry => {
    APIS[currentApiId].sendCommand(entry.text)
    entry.text = ''
  },
})

const chatSendButton = Widget.Button({
  vpack: 'center',
  label: '󰁝',
  className: 'txt-norm icon-material sidebar-chat-send',
  setup: setupCursorHover,
  onClicked: () => {
    APIS[currentApiId].sendCommand(chatEntry.text)
    chatEntry.text = ''
  },
})

const textboxArea = Widget.Box({
  className: 'sidebar-chat-textarea spacing-h-10',
  children: [chatEntry, chatSendButton]
})

const apiContentStack = Widget.Stack({
  vexpand: true,
  transition: 'slide_left_right',
  items: APIS.map(api => [api.name, api.contentWidget]),
})

const apiCommandStack = Widget.Stack({
  transition: 'slide_up_down',
  items: APIS.map(api => [api.name, api.commandBar]),
})

function switchToTab(id) {
  APIS[currentApiId].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', false)
  APIS[id].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', true)
  apiContentStack.shown = APIS[id].name
  apiCommandStack.shown = APIS[id].name
  chatEntry.placeholderText = APIS[id].placeholderText
  currentApiId = id
}
const apiSwitcher = Widget.Box({
  homogeneous: true,
  children: [
    Widget.Box({
      className: 'sidebar-chat-apiswitcher spacing-h-5',
      hpack: 'center',
      children: APIS.map((api, id) => Widget.Button({
        child: api.tabIcon,
        tooltipText: api.name,
        setup: setupCursorHover,
        onClicked: () => switchToTab(id)
      })),
    }),
  ]
})

export default Widget.Box({
  properties: [
    ['nextTab', () => switchToTab(Math.min(currentApiId + 1, APIS.length - 1))],
    ['prevTab', () => switchToTab(Math.max(0, currentApiId - 1))],
  ],
  vertical: true,
  className: 'spacing-v-10',
  homogeneous: false,
  children: [
    apiSwitcher,
    apiContentStack,
    apiCommandStack,
    textboxArea,
  ],
})
