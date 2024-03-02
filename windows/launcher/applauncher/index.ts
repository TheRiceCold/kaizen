import List from './List'
import Entry from './Entry'
import Favorites from './Favorites'
import options from 'options'

export default () => Widget.Box({
  vpack: 'start',
  vertical: true,
  className: 'appmenu',
  children: [ Entry, Favorites, List ],
  css: options.launcher.width.bind().as(v => `min-width: ${v}pt;`),
  setup: self => self.hook(App, (_, win, visible) => {
    if (win !== 'launcher')
      return

    Entry.text = ''
    if (visible) { // Focus
      Entry.set_position(-1)
      Entry.select_region(0, -1)
      Entry.grab_focus()
      Favorites.revealChild = true
    }
  }),
})
