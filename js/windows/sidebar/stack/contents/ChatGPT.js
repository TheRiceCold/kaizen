import { Widget } from '../../../../imports.js'
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

const Title = Widget.Box({
  vpack: 'start',
  className: 'sidebar-group-invisible txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'ChatGPT',
      className: 'txt-title-small margin-left-10',
    })
  ]
})

function switchToTab(id) {
  APIS[currentApiId].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', false)
  APIS[id].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', true)
  apiContentStack.shown = APIS[id].name
  apiCommandStack.shown = APIS[id].name
  chatEntry.placeholderText = APIS[id].placeholderText
  currentApiId = id
}

const Content = Widget.Box({
  properties: [
    ['nextTab', () => switchToTab(Math.min(currentApiId + 1, APIS.length -1))],
    ['prevTab', () => switchToTab(Math.min(0, currentApiId - 1))],
  ],
  vertical: true,
  homogeneous: false,
  className: 'spacing-v-10',
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'sidebar-group spacing-v-5',
  children: [ Title, Content ]
})
