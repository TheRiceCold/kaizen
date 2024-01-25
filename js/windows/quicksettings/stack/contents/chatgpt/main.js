import { Widget } from '../../../../../imports.js'
import { ChatGPT } from '../../../../../services/main.js'
import { setupCursorHover } from '../../../../../misc/CursorHover.js'

import {
  chatGPTView,
  chatGPTCommands,
  sendMessage as chatGPTSendMessage,
  chatGPTTabIcon
} from './apis/chatgpt.js'

const APIS = [
  {
    name: 'ChatGPT',
    sendCommand: chatGPTSendMessage,
    contentWidget: chatGPTView,
    commandBar: chatGPTCommands,
    tabIcon: chatGPTTabIcon,
    placeholderText: 'Message ChatGPT',
  }
]

let currentApiId = 0
APIS[currentApiId].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', true)

const chatEntry = Widget.Entry({
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

const Title = Widget.Box({
  vpack: 'start',
  className: 'txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'ChatGPT',
      className: 'txt-title-small margin-left-10',
    })
  ]
})

const apiCommandStack = Widget.Stack({
  transition: 'slide_up_down',
  items: APIS.map(api => [api.name, api.commandBar]),
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

const Content = Widget.Box({
  vertical: true,
  homogeneous: false,
  className: 'spacing-v-10',
  children: [
    apiContentStack,
    apiCommandStack,
    textboxArea,
  ]
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'spacing-v-5',
  children: [ Title, Content ],
})
