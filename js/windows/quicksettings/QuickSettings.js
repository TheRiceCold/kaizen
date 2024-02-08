import Header from './Header.js'
import { ContentStack, switchTab, currentTabId, contents } from './exports.js'
import { options } from '../../constants/main.js'

const { Gdk } = imports.gi

export default Widget.Box({
  vertical: true,
  spacing: options.spacing.value,
  children: [ Header, ContentStack ],
  className: 'quicksettings spacing-v-15',
  setup: self => self.on('key-press-event', (_, event) => {
    if (event.get_keyval()[1] === Gdk.KEY_Tab)
      switchTab((currentTabId + 1) % contents.length)
  })
})
