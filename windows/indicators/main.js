import { Widget } from '../../imports.js'
import Indicator from '../../services/indicator.js'
import IndicatorValues from './IndicatorValues.js'
import MusicControls from './MusicControls.js'
import ColorScheme from './Colorscheme.js'
import NotificationPopups from './NotificationPopups.js'

export default () => Widget.Window({
  name: `indicator`,
  className: 'indicator',
  layer: 'overlay',
  visible: true,
  anchor: ['top'],
  child: Widget.EventBox({
    onHover: () => { //make the widget hide when hovering
      Indicator.popup(-1)
    },
    child: Widget.Box({
      vertical: true,
      css: 'min-height: 2px;',
      children: [
        IndicatorValues(),
        MusicControls(),
        NotificationPopups(),
        ColorScheme(),
      ]
    })
  }),
})
