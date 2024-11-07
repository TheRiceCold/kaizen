import screenTools from 'service/screen'

import { gromit } from 'lib/utils'
import { toggleWidget } from 'lib/globals'
import { Menu, MenuItemLabel as Item } from 'widgets'

export default widget => Menu(widget, [
  //Item('󰑓 Refresh', () => sh('pkill ags & ags')),
  Item('󰽉 Draw', () => gromit.start()),
  Item(' Zoom', () => screenTools.zoom()), // its asynchronous
  Item(' Color', () => toggleWidget('color')),
  Item('  Keyboard', () => toggleWidget('keyboard')),
  //Item(' Pomodoro', () => { }),

  Item('  Recorder', [
    Item('󰆐 Region', () => screenTools.recorder()),
    Item(' Fullscreen', () => screenTools.recorder('fullscreen')),
    Item('󰆐 Region | Audio', () => screenTools.recorder()), // TODO:
    Item(' Fullscreen | Audio', () => screenTools.recorder('fullscreen')), // TODO:
  ]),

  Item('󰆟 Screenshot', [
    Item('󰆐 Region', () => screenTools.screenshot()),
    Item(' Fullscreen', () => screenTools.screenshot(true)),
  ]),
])
