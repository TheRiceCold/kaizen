import { Widget } from '../../imports.js'
import { Indicator } from '../../services/main.js'
import IndicatorValues from './IndicatorValues.js'
import MusicControls from './MusicControls.js'
import ColorScheme from './Colorscheme.js'
import NotificationPopups from './NotificationPopups.js'

export default Widget.Window({
  visible: true,
  anchor: ['top'],
  layer: 'overlay',
  name: 'indicator',
  className: 'indicator',
  child: Widget.EventBox({
    onHover: () => Indicator.popup(-1),
    child: Widget.Box({
      vertical: true,
      className: 'osd-window',
      css: 'min-height: 2px;',
      children: [
        IndicatorValues,
        MusicControls,
        NotificationPopups,
        ColorScheme,
      ]
    })
  })
})
