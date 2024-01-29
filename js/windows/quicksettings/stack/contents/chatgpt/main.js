import AgsWidget from 'resource:///com/github/Aylur/ags/widgets/widget.js'
import { Widget } from '../../../../../imports.js'
import { ChatGPT, Gemini } from '../../../../../services/main.js'
import { setupCursorHover } from '../../../../../misc/CursorHover.js'
import {
  chatGPTView,
  chatGPTCommands,
  sendMessage as chatGPTSendMessage,
  chatGPTTabIcon
} from './apis/chatgpt.js'

const { Gdk, Gtk } = imports.gi
class AgsTextView extends AgsWidget(Gtk.TextView, 'AgsTextView') {
  static { AgsWidget.register(this, {}) }
  constructor(params) { super(params) }
}
const TextView = Widget.createCtor(AgsTextView)

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

const chatEntry = TextView({
  hexpand: true,
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  acceptsTab: false,
  className: 'sidebar-chat-entry',
  setup: self => self
    .hook(ChatGPT, self => {
      if (APIS[currentApiId].name != 'Assistant (ChatGPT 3.5)') return
      self.placeholderText = (ChatGPT.key.length > 0 ? 'Message ChatGPT...' : 'Enter OpenAI API Key...')
    }, 'hasKey')
    .hook(Gemini, self => {
      if (APIS[currentApiId].name != 'Assistant (Gemini Pro)') return
      self.placeholderText = (Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...')
    }, 'hasKey')
    .on('key-press-event', (widget, event) => {
      const keyval = event.get_keyval()[1]
      if (event.get_keyval()[1] === Gdk.KEY_Return && event.get_state()[1] == Gdk.ModifierType.MOD2_MASK) {
        apiSendMessage(widget)
        return true
      }
      // Global keybinds
      if (!(event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) &&
        event.get_keyval()[1] === Gdk.KEY_Page_Down) {
        const toSwitchTab = contentStack.get_visible_child()
        toSwitchTab.attribute.nextTab()
      }
      else if (!(event.get_state()[1] & Gdk.ModifierType.CONTROL_MASK) &&
        event.get_keyval()[1] === Gdk.KEY_Page_Up) {
        const toSwitchTab = contentStack.get_visible_child()
        toSwitchTab.attribute.prevTab()
      }
    }),
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
