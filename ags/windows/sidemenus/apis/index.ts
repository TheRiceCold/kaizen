import MenuRevealer from '../MenuRevealer'

import icons from 'data/icons'
import gemini from './Gemini'
import { setupCursorHover } from 'misc/cursorhover'
import { enableClickThrough } from 'lib/utils'

const { Gtk } = imports.gi
const TextView = Widget.subclass(Gtk.TextView, 'AgsTextView')

export const chatEntry = TextView({
  hexpand: true,
  acceptsTab: false,
  wrapMode: Gtk.WrapMode.WORD_CHAR,
  setup: (self) => self.hook(App, (self, currentName, visible) => {
    if (visible && currentName === 'sideleft') 
      self.grab_focus()
  })
  // .hook(GPTService, (self) => {
  //   if (APIS[currentApiId].name != 'Assistant (GPTs)') return;
  //   self.placeholderText = (GPTService.key.length > 0 ? 'Message the model...' : 'Enter API Key...');
  // }, 'hasKey')
  // .hook(Gemini, (self) => {
  //     if (APIS[currentApiId].name != 'Assistant (Gemini Pro)') return;
  //     self.placeholderText = (Gemini.key.length > 0 ? 'Message Gemini...' : 'Enter Google AI API Key...');
  // }, 'hasKey')
  // .on("key-press-event", (widget, event) => {
  //   // Don't send when Shift+Enter
  //   if (event.get_keyval()[1] === Gdk.KEY_Return && event.get_state()[1] == Gdk.ModifierType.MOD2_MASK) {
  //     apiSendMessage(widget)
  //     return true;
  //   }
  //   // Keybinds
  //   if (checkKeybind(event, userOptions.keybinds.sidebar.cycleTab))
  //       widgetContent.cycleTab()
  //   else if (checkKeybind(event, userOptions.keybinds.sidebar.nextTab))
  //       widgetContent.nextTab()
  //   else if (checkKeybind(event, userOptions.keybinds.sidebar.prevTab))
  //       widgetContent.prevTab()
  //   else if (checkKeybind(event, userOptions.keybinds.sidebar.apis.nextTab)) {
  //     apiWidgets.attribute.nextTab()
  //     return true
  //   }
  //   else if (checkKeybind(event, userOptions.keybinds.sidebar.apis.prevTab)) {
  //     apiWidgets.attribute.prevTab()
  //     return true
  //   }
  //  }),
})

const chatPlaceholderRevealer = Widget.Revealer({
  revealChild: true,
  transition: 'crossfade',
  child: Widget.Label({
    hpack: 'start',
    vpack: 'center',
    label: 'Enter Message',
  }),
  setup: enableClickThrough,
})

const chatSendButton = Widget.Button({
  vpack: 'end',
  setup: setupCursorHover,
  child: Widget.Icon(icons.ui.send),
  // onClicked: (self) => {
  //  APIS[currentApiId].sendCommand(chatEntry.get_buffer().text)
  //  chatEntry.get_buffer().set_text('', -1)
  // },
})

export default MenuRevealer('apis', [ 
  Widget.Box([
    Widget.Button({
      setup: setupCursorHover,
      child: Widget.Box([ Widget.Icon(icons.ai.gemini), Widget.Label('Gemini') ])
    }),
    Widget.Button({
      setup: setupCursorHover,
      child: Widget.Box([ Widget.Icon(icons.ai.open_ai), Widget.Label('Open AI') ])
    }),
  ]),
  Widget.Stack({
    children: {
      gemini,    
    }
  }),
  Widget.Box([
    Widget.Overlay({
      passThrough: true,
      child: chatEntry,
      overlay: chatPlaceholderRevealer,
    }),
    chatSendButton,
  ])
])
