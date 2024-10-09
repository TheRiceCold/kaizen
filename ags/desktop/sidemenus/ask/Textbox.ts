import { ButtonIcon } from 'widgets'
import GeminiSendMessage from './gemini/SendMessage'

import icons from 'data/icons'
import { enableClickThrough } from 'lib/utils'

const { Gtk } = imports.gi
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')
const { Box, Label, Revealer, Scrollable, Overlay } = Widget

const ChatSendButton = ButtonIcon(
  icons.ui.send, () => {
    const text = ChatEntry.get_buffer().text
    GeminiSendMessage(text)
    ChatEntry.get_buffer().set_text('', -1)
  }, { vpack: 'end', className: 'chat-send' },
)

export const ChatPlaceholder = Label({
  hpack: 'start',
  vpack: 'center',
  label: 'Message Gemini...',
  className: 'chat-placeholder',
})

export const ChatPlaceholderRevealer = Revealer({
  revealChild: true,
  transition: 'crossfade',
  setup: enableClickThrough,
}, ChatPlaceholder)

export const ChatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  className: 'chat-entry',
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  setup(self: typeof TextView) {
    self.placeholderText = 'Message Gemini'
  },
})

ChatEntry.get_buffer().connect('changed', (buffer) => {
  const bufferText = buffer.get_text(
    buffer.get_start_iter(),
    buffer.get_end_iter(),
    true,
  )
  ChatSendButton.toggleClassName('chat-send-available', bufferText.length > 0)
  ChatPlaceholderRevealer.revealChild = bufferText.length === 0
  if (buffer.get_line_count() > 1 || bufferText.length > 30) {
    ChatEntry.set_valign(Gtk.Align.FILL)
    ChatPlaceholder.set_valign(Gtk.Align.FILL)
  } else {
    ChatEntry.set_valign(Gtk.Align.CENTER)
    ChatPlaceholder.set_valign(Gtk.Align.CENTER)
  }
})

export default Box(
  { vpack: 'center', className: 'chat-textarea' },
  Overlay({
    passThrough: true,
    overlay: ChatPlaceholderRevealer,
    child: Scrollable({ hscroll: 'never', vscroll: 'always' }, ChatEntry),
  }),
  ChatSendButton,
)
