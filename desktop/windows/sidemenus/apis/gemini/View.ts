import GeminiService from 'service/api/gemini'
import { ChatEntry } from '../Textbox'
import { ChatMessage } from '../Message'
import Welcome from './Welcome'

const { Gtk } = imports.gi
const MODEL_NAME = 'Gemini'

const ChatContent = Widget.Box({
  vertical: true,
}).hook(GeminiService, (self, id) => {
  const message = GeminiService.messages[id]
  if (!message) return
  self.add(ChatMessage(message, MODEL_NAME))
})

export default Widget.Box([
  Widget.Scrollable({
    vexpand: true,
    className: 'sidebar-chat-viewport',
    child: Widget.Box({ vertical: true }, Welcome, ChatContent),
    setup(self) {
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
      adjustment.connect('changed', () =>
        Utils.timeout(1, () => {
          if (!ChatEntry.hasFocus) return
          adjustment.set_value(
            adjustment.get_upper() - adjustment.get_page_size(),
          )
        }),
      )
    },
  }),
])
