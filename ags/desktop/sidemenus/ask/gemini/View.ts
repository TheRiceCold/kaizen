import GeminiService from 'service/api/gemini'

import { VBox } from 'widgets'
import Welcome from './Welcome'
import { ChatEntry } from '../Textbox'
import { ChatMessage } from '../Message'

const { Gtk } = imports.gi

export const ChatContent = VBox().hook(
  GeminiService, (self: typeof Widget.Box, id: number) => {
    const message = GeminiService.messages[id]
    if (!message) return
    self.add(ChatMessage(message, 'Gemini'))
  }, 'newMsg')

export default Widget.Scrollable({
  vexpand: true,
  className: 'chat-viewport',
  child: VBox([ Welcome, ChatContent ]),
  setup(self: typeof Widget.Scrollable) {
    // Show scrollbar
    self.set_policy(Gtk.PolicyType.NEVER, Gtk.PolicyType.AUTOMATIC)
    const vScrollbar = self.get_vscrollbar()
    vScrollbar.get_style_context().add_class('sidebar-scrollbar')

    // Avoid click-to-scroll-widget-to-view behavior
    Utils.timeout(1, () => {
      const viewport = self.child
      viewport.set_focus_vadjustment(new Gtk.Adjustment(undefined))
    })

    // Always scroll to bottom with new content
    const adjustment = self.get_vadjustment()
    adjustment.connect('changed', () => Utils.timeout(1, () => {
      if(!ChatEntry.hasFocus) return
      adjustment.set_value(adjustment.get_upper() - adjustment.get_page_size())
    }))
  }
})
