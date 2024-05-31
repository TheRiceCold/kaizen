import screenTools from 'service/screen'
import Annotation from 'service/annotation'

import { sh } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const Item = (label, activate) => Widget.MenuItem({
  cursor: 'pointer',
  child: Widget.Label({ hpack: 'start', label }),
  setup(self) {
    if (Array.isArray(activate))
      self.submenu = Widget.Menu({ children: activate })
    else
      self.onActivate = activate
  }
})

export default event => {
  return Widget.Menu({
    children: [
      Item(' Lock', () => sh('kaizen-lock')),
      Item('󰑓 Refresh', () => sh('pkill ags & ags')),
      Item('󱓞 Launch', [
        Item(' Spotify', () => sh('spotify')),
        Item('󰙯 Discord', () => sh('vesktop')),
        Item(' Neovide', () => sh('neovide')),
        Item(' Godot', () => sh('godot')),
        Item(' Krita', () => sh('krita')),
      ]),
      Item(' CLI', [
        Item(' Files', () => sh('foot yazi ~')),
        Item('󰡗 Chess', () => sh('foot uchess')),
        Item('󰰤 Tetris', () => sh('foot tetris')),
        Item('󰟥 Pipes', () => sh('foot pipes-rs')),
        Item('  Typing', () => sh('foot toipe')),
        Item(' Containers', () => sh('foot podman-tui')),
      ]),
      Item(' Tools', [
        Item('󰽉 Draw', () => Annotation.start()),
        Item(' Zoom', () => screenTools.zoom()),
        Item(' Color', () => toggleWidget('color')),
        Item('  Keyboard', () => toggleWidget('keyboard')),
        Item('  Recorder', [
          Item('󰆐 Region', () => screenTools.recorder()),
          Item(' Fullscreen', () => screenTools.recorder('fullscreen')),
          Item('󰆐 Region | Audio', () => screenTools.recorder()), // TODO:
          Item(' Fullscreen | Audio', () => screenTools.recorder('fullscreen')), // TODO:
        ]),
        Item('󰆟 Screenshot', [
          Item(' Fullscreen', () => screenTools.screenshot()),
          Item('󰆐 Region', () => screenTools.screenshot(false)),
        ]),
      ]),
      // TODO:
      Item('󰜬 Widgets', [
        Item(' Player', () => { }),
        Item(' Clock', () => { }),
        Item(' Calendar', () => { }),
        Item('󱞁 Notes', () => { }),
        Item(' System', () => { }),
        Item(' Weather', () => { }),
        Item(' Quotes', () => { }),
        Item(' Verses', () => { }),
      ])
    ]
  }).popup_at_pointer(event)
}
