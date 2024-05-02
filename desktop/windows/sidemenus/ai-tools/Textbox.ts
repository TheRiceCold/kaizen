import Gemini from 'service/api/gemini'
import GPTService from 'service/api/gpt'

import GPTSendMessage from './gpt/SendMessage'
import GeminiSendMessage from './gemini/SendMessage'

import { stackItems, currentTab } from './Content'

import { setupCursorHover } from 'misc/cursorhover'
import { enableClickThrough } from 'lib/utils'
import icons from 'data/icons'
import options from 'options/theme'

const { Gtk } = imports.gi
const { scheme, radius } = options.theme
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')

const chatSendButton = Widget.Button({
  vpack: 'end',
  className: 'chat-send',
  setup: setupCursorHover,
  child: Widget.Icon(icons.ui.send),
}).hook(currentTab, self => {
  const cmd = ChatEntry.get_buffer().text

  self.onClicked = () => (stackItems[currentTab.value] === 0) 
    ? GeminiSendMessage(cmd) : GPTSendMessage(cmd)

  ChatEntry.get_buffer().set_text('', -1)
})

export const ChatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  css: `
    opacity: 0.5;
    border-radius: ${radius};
    color: ${options.theme[scheme].fg};
    background-color: ${options.theme[scheme].bg};
  `
})
  .hook(App, (self, currentName, visible) => {
    if (visible && currentName === 'sideleft') 
      self.grab_focus()
  })
  .hook(GPTService, self => {
    if (stackItems[currentTab.value] !== 'ChatGPT') return
    self.placeholderText = GPTService.key.length > 0 ? 'Message the model...' : 'Enter API Key...'
  }, 'hasKey')
  .hook(Gemini, self => {
    if (stackItems[currentTab.value] !== 'Gemini') return
    self.placeholderText = Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...'
  }, 'hasKey')

export const ChatPlaceholder = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  label: 'Enter Message',
  className: 'chat-placeholder',
})

export default Widget.Box({ 
  vpack: 'center',
  className: 'chat-textarea', 
}, Widget.Overlay({
  passThrough: true,
  child: Widget.Scrollable({
    hscroll: 'never',
    vscroll: 'always',
    child: ChatEntry,
  }),
  overlay: Widget.Revealer({
    revealChild: true,
    transition: 'crossfade',
    child: ChatPlaceholder,
    setup: enableClickThrough,
  }),
}), chatSendButton)
