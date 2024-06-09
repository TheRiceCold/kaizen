import GPTService from 'service/api/gpt'
import GeminiService from 'service/api/gemini'

import GPTSendMessage from './gpt/SendMessage'
import GeminiSendMessage from './gemini/SendMessage'

import { currentTab } from './Content'

import { enableClickThrough } from 'lib/utils'
import icons from 'data/icons'

const { Gdk, Gtk } = imports.gi
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')

const ChatSendButton = Widget.Button({
  vpack: 'end',
  cursor: 'pointer',
  className: 'chat-send',
  child: Widget.Icon(icons.ui.send),
  onClicked() {
    const text = ChatEntry.get_buffer().text
    if (currentTab.value === 'gemini')
      GeminiSendMessage(text)
    else
      GPTSendMessage(text)
    ChatEntry.get_buffer().set_text('', -1)
  }
})
export const ChatPlaceholder = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  label: 'Message Gemini...',
  className: 'chat-placeholder',
})

export const ChatPlaceholderRevealer = Widget.Revealer({
  revealChild: true,
  transition: 'crossfade',
  child: ChatPlaceholder,
  setup: enableClickThrough,
})

export const ChatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  className: 'chat-entry',
  wrapMode: Gtk.WrapMode.WORD_CHAR,
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

ChatEntry.get_buffer().connect('changed', (buffer) => {
  const bufferText = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), true)
  ChatSendButton.toggleClassName('chat-send-available', bufferText.length > 0)
  ChatPlaceholderRevealer.revealChild = bufferText.length === 0
  if (buffer.get_line_count() > 1 || bufferText.length > 30) {
    // ChatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', true)
    ChatEntry.set_valign(Gtk.Align.FILL)
    ChatPlaceholder.set_valign(Gtk.Align.FILL)
  }
  else {
    // ChatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', false)
    ChatEntry.set_valign(Gtk.Align.CENTER)
    ChatPlaceholder.set_valign(Gtk.Align.CENTER)
  }
})

export default Widget.Box(
  { vpack: 'center', className: 'chat-textarea' },
  Widget.Overlay({
    passThrough: true,
    child: Widget.Scrollable({
      child: ChatEntry,
      hscroll: 'never',
      vscroll: 'always',
    }),
    overlay: ChatPlaceholderRevealer
  }), ChatSendButton)
