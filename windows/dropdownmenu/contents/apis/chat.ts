import Gemini from 'service/api/gemini'
import ChatGPT from 'service/api/chatgpt'

import { contentStack } from './content'
import { setupCursorHover } from 'misc/cursorhover'
import { enableClickthrough } from 'misc/clickthrough'
import { APIS, currentApiId, } from './imports'

const { Gtk, Gdk } = imports.gi
const EXPAND_INPUT_THRESHOLD = 30
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')

const chatSendButton = Widget.Button({
  vpack: 'end',
  label: 'arrow_upward',
  setup: setupCursorHover,
  className: 'txt-norm icon-material sidebar-chat-send',
  onClicked: () => {
    APIS[currentApiId].sendCommand(chatEntry.get_buffer().text)
    chatEntry.get_buffer().set_text('', -1)
  },
})

const chatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  className: 'sidebar-chat-entry txt txt-smallie',
  setup: self => self.hook(ChatGPT, self => {
      if (APIS[currentApiId].name != 'Assistant (ChatGPT 3.5)') return
      self.placeholderText = (ChatGPT.key.length > 0 ? 'Message ChatGPT...' : 'Enter OpenAI API Key...')
    }, 'hasKey').hook(Gemini, (self) => {
      if (APIS[currentApiId].name != 'Assistant (Gemini Pro)') return
      self.placeholderText = (Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...')
    }, 'hasKey').on('key-press-event', (widget, event) => {
      const keyval = event.get_keyval()[1]
      if (event.get_keyval()[1] === Gdk.KEY_Return && event.get_state()[1] == Gdk.ModifierType.MOD2_MASK) {
        apiSendMessage(widget)
        return true
      }
      // Global keybinds
      if (!(keyval & Gdk.ModifierType.CONTROL_MASK) &&
        keyval === Gdk.KEY_Page_Down) {
        const toSwitchTab = contentStack.get_visible_child()
        toSwitchTab.attribute.nextTab()
      }
      else if (!(keyval & Gdk.ModifierType.CONTROL_MASK) &&
        keyval === Gdk.KEY_Page_Up) {
        const toSwitchTab = contentStack.get_visible_child()
        toSwitchTab.attribute.prevTab()
      }
    }),
})

const chatEntryWrapper = Widget.Scrollable({
  child: chatEntry,
  hscroll: 'never',
  vscroll: 'always',
  className: 'sidebar-chat-wrapper',
})

function apiSendMessage(textView) {
  // Get text
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

const chatPlaceholder = Widget.Label({
  hpack: 'start',
  vpack: 'center',
  label: APIS[currentApiId].placeholderText,
  className: 'txt-subtext txt-smallie margin-left-5',
})

const chatPlaceholderRevealer = Widget.Revealer({
  revealChild: true,
  transition: 'crossfade',
  transitionDuration: 200,
  child: chatPlaceholder,
  setup: enableClickthrough,
})

chatEntry.get_buffer().connect('changed', buffer => {
  const bufferText = buffer.get_text(buffer.get_start_iter(), buffer.get_end_iter(), true)
  chatSendButton.toggleClassName('sidebar-chat-send-available', bufferText.length > 0)
  chatPlaceholderRevealer.revealChild = (bufferText.length == 0)
  if (buffer.get_line_count() > 1 || bufferText.length > EXPAND_INPUT_THRESHOLD) {
    chatEntry.set_valign(Gtk.Align.FILL)
    chatPlaceholder.set_valign(Gtk.Align.FILL)
    chatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', true)
  }
  else {
    chatEntry.set_valign(Gtk.Align.CENTER)
    chatPlaceholder.set_valign(Gtk.Align.CENTER)
    chatEntryWrapper.toggleClassName('sidebar-chat-wrapper-extended', false)
  }
})

export {
  chatSendButton,
  chatPlaceholder,
  chatEntryWrapper,
  chatPlaceholderRevealer,
}
