import screenTools from 'service/screen'
import Annotation from 'service/annotation'

import { sh } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const Item = (label: string, activate) => Widget.MenuItem({
  cursor: 'pointer',
  child: Widget.Label({ hpack: 'start', label }),
  setup(self: typeof Widget.MenuItem) {
    if (Array.isArray(activate))
      self.submenu = Widget.Menu({ children: activate })
    else
      self.onActivate = activate
  }
})

export default event => Widget.Menu({
  children: [
    Item('󰑓 Refresh', () => sh('pkill ags & ags')),
    Item('󰽉 Draw', () => Annotation.start()),
    Item(' Zoom', () => screenTools.zoom()),
    Item(' Color', () => toggleWidget('color')),
    Item('  Keyboard', () => toggleWidget('keyboard')),
    Item(' Pomodoro', () => { }), // TODO:

    // Recorder
    Item('  Recorder', [
      Item('󰆐 Region', () => screenTools.recorder()),
      Item(' Fullscreen', () => screenTools.recorder('fullscreen')),
      Item('󰆐 Region | Audio', () => screenTools.recorder()), // TODO:
      Item(' Fullscreen | Audio', () => screenTools.recorder('fullscreen')), // TODO:
    ]),

    // Screenshot
    Item('󰆟 Screenshot', [
      Item('󰆐 Region', () => screenTools.screenshot()),
      Item(' Fullscreen', () => screenTools.screenshot(true)),
    ]),
  ]
}).popup_at_pointer(event)
