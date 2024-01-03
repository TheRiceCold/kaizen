import { Widget } from '../../imports.js'
import ColorScheme from './Colorscheme.js'
import MusicControls from './MusicControls.js'
import NotificationPopups from './NotificationPopups.js'

export default Widget.Window({
  visible: true,
  anchor: ['top'],
  layer: 'overlay',
  name: 'indicator',
  className: 'indicator',
  child: Widget.Box({
    vertical: true,
    className: 'osd-window',
    css: 'min-height: 2px;',
    children: [
      MusicControls,
      NotificationPopups,
      ColorScheme,
    ]
  })
})
