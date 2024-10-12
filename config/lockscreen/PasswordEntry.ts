import { type EntryProps } from 'types/widgets/entry'

import { windows, lock } from './main'

function unlock() {
  for (const win of windows)
    win.window.child.children[0].revealChild = false

  Utils.timeout(500, () => {
    lock.unlock_and_destroy()
    windows.forEach(w => w.window.destroy())
    imports.gi.Gdk.Display.get_default()?.sync()
    App.quit()
  })
}

export default Widget.Entry({
  onAccept(self: EntryProps) {
    self.sensitive = false
    Utils.authenticate(self.text ?? '')
      .then(() => unlock())
      .catch(e => {
        self.text = ''
        self.parent.children[0].label = e.message
        self.sensitive = true
      })
  },
  xalign: 0.5,
  hpack: 'center',
  visibility: false,
  placeholderText: 'Click Tab',
}).on('realize', (self: EntryProps) => self.grab_focus())
