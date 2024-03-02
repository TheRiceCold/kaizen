const { Gtk, Gdk } = imports.gi
import { setupCursorHover, setupCursorHoverInfo } from 'misc/cursorhover'
// APIs
import Gemini from 'service/api/gemini'
import ChatGPT from 'service/api/chatgpt'
import { geminiView, geminiCommands, sendMessage as geminiSendMessage, geminiTabIcon } from './gemini'
import { chatGPTView, chatGPTCommands, sendMessage as chatGPTSendMessage, chatGPTTabIcon } from './chatgpt'
import { enableClickthrough } from 'misc/clickthrough'
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')

const EXPAND_INPUT_THRESHOLD: number = 30
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
  },
]
let currentApiId = 0
APIS[currentApiId].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', true)

function apiSendMessage(textView) {
  const buffer = textView.get_buffer()
  const [start, end] = buffer.get_bounds()
  const text = buffer.get_text(start, end, true).trimStart()
  if (!text || text.length == 0) return
  // Send
  APIS[currentApiId].sendCommand(text)
  // Reset
  buffer.set_text('', -1)
  chatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', false)
  chatEntry.set_valign(Gtk.Align.CENTER)
}

export const chatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  className: 'sidebar-chat-entry txt txt-smallie',
  setup: self => self.hook(ChatGPT, self => {
      if (APIS[currentApiId].name != 'Assistant (ChatGPT 3.5)') return
      self.placeholderText = (ChatGPT.key.length > 0 ? 'Message ChatGPT...' : 'Enter OpenAI API Key...')
    }, 'hasKey').hook(Gemini, self => {
      if (APIS[currentApiId].name != 'Assistant (Gemini Pro)') return
      self.placeholderText = (Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...')
    }, 'hasKey').on('key-press-event', (widget, event) => {
      const keyval = event.get_keyval()[1]
      if (keyval === Gdk.KEY_Return && event.get_state()[1] == Gdk.ModifierType.MOD2_MASK) {
        apiSendMessage(widget)
        return true
      }
    }),
})

chatEntry.get_buffer().connect('changed', (buffer) => {
  const bufferText = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), true)
  chatSendButton.toggleClassName('sidebar-chat-send-available', bufferText.length > 0)
  chatPlaceholderRevealer.revealChild = (bufferText.length == 0)
  if (buffer.get_line_count() > 1 || bufferText.length > EXPAND_INPUT_THRESHOLD) {
    chatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', true)
    chatEntry.set_valign(Gtk.Align.FILL)
    chatPlaceholder.set_valign(Gtk.Align.FILL)
  }
  else {
    chatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', false)
    chatEntry.set_valign(Gtk.Align.CENTER)
    chatPlaceholder.set_valign(Gtk.Align.CENTER)
  }
})

const chatEntryWrapper = Widget.Scrollable({
  child: chatEntry,
  hscroll: 'never',
  vscroll: 'always',
  className: 'sidebar-chat-wrapper',
})

const chatSendButton = Widget.Button({
  vpack: 'end',
  label: 'arrow_upward',
  setup: setupCursorHover,
  className: 'txt-norm sidebar-chat-send',
  onClicked: () => {
    APIS[currentApiId].sendCommand(chatEntry.get_buffer().text)
    chatEntry.get_buffer().set_text('', -1)
  },
})

const chatPlaceholder = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  label: APIS[currentApiId].placeholderText,
  className: 'txt-subtext txt-smallie margin-left-5',
})

const chatPlaceholderRevealer = Widget.Revealer({
  revealChild: true,
  child: chatPlaceholder,
  transition: 'crossfade',
  transitionDuration: 200,
  setup: enableClickthrough,
})

const textboxArea = Widget.Box({
  className: 'sidebar-chat-textarea',
  children: [
    Widget.Overlay({
      passThrough: true,
      child: chatEntryWrapper,
      overlays: [chatPlaceholderRevealer],
    }),
    Widget.Box({ className: 'width-10' }),
    chatSendButton,
  ]
})

const apiContentStack = Widget.Stack({
  vexpand: true,
  transition: 'slide_left_right',
  transitionDuration: 160,
  children: APIS.reduce((acc, api) => {
    acc[api.name] = api.contentWidget
    return acc
  }, {}),
})

const apiCommandStack = Widget.Stack({
  transition: 'slide_up_down',
  transitionDuration: 160,
  children: APIS.reduce((acc, api) => {
    acc[api.name] = api.commandBar
    return acc
  }, {}),
})

function switchToTab(id) {
  APIS[currentApiId].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', false)
  APIS[id].tabIcon.toggleClassName('sidebar-chat-apiswitcher-icon-enabled', true)
  apiContentStack.shown = APIS[id].name
  apiCommandStack.shown = APIS[id].name
  chatPlaceholder.label = APIS[id].placeholderText
  currentApiId = id
}

const apiSwitcher = Widget.CenterBox({
  centerWidget: Widget.Box({
    hpack: 'center',
    className: 'sidebar-chat-apiswitcher spacing-h-5',
    children: APIS.map((api, id) => Widget.Button({
      child: api.tabIcon,
      tooltipText: api.name,
      setup: setupCursorHover,
      onClicked: () => switchToTab(id)
    })),
  }),
  endWidget: Widget.Button({
    hpack: 'end',
    label: 'lightbulb',
    setup: setupCursorHoverInfo,
    className: 'txt-subtext txt-norm',
    tooltipText: 'Use PageUp/PageDown to switch between API pages',
  }),
})

export default Widget.Box({
  attribute: {
    nextTab: () => switchToTab(Math.min(currentApiId + 1, APIS.length - 1)),
    prevTab: () => switchToTab(Math.max(0, currentApiId - 1)),
  },
  vertical: true,
  homogeneous: false,
  children: [
    apiSwitcher,
    apiContentStack,
    apiCommandStack,
    textboxArea,
  ],
})
