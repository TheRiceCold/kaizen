import { Widget } from '../../imports.js'
import Popups from './Popups.js'
import ColorScheme from './Colorscheme.js'
import MusicControls from './MusicControls.js'

export default Widget.Window({
  visible: true,
  anchor: ['top'],
  layer: 'overlay',
  name: 'indicator',
  className: 'indicator',
  child: Widget.Box({
    vertical: true,
    css: 'min-height: 2px;',
    className: 'osd-window',
    children: [MusicControls, Popups, ColorScheme]
  })
})
