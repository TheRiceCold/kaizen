import GPTService from 'service/api/gpt'
import GeminiService from 'service/api/gemini'

import GPTSendMessage from './gpt/SendMessage'
import GeminiSendMessage from './gemini/SendMessage'

import { currentTab } from './Content'

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
}).hook(currentTab, () => {
  const buffer = ChatEntry.get_buffer()
  const cmd = buffer.text
  if (currentTab.value === 'gemini') 
    GeminiSendMessage(cmd) 
  else 
    GPTSendMessage(cmd)
  buffer.set_text('', -1)
})

export const ChatPlaceholder = Widget.Label({
  hpack: 'start', 
  vpack: 'center', 
  label: 'Message Gemini...',
  className: 'chat-placeholder',
})

export const ChatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  css: `
    opacity: 0.5;
    border-radius: ${radius};
    color: ${options.theme[scheme].fg};
    background-color: ${options.theme[scheme].bg};`
})
  .hook(GPTService, self => {
    if (currentTab.value !== 'chatGPT') return
    self.placeholderText = GPTService.key.length > 0 
      ? 'Message the model...' : 'Enter API Key...'
  }, 'hasKey')
  .hook(GeminiService, self => {
    if (currentTab.value !== 'gemini') return
    self.placeholderText = GeminiService.key.length > 0 
      ? 'Message Gemini...' : 'Enter Google AI API Key...'
  }, 'hasKey')


export default Widget.Box(
  { vpack: 'center', className: 'chat-textarea' }, 
  Widget.Overlay({
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
