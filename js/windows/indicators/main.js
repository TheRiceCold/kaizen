import { Widget } from '../../imports.js'
import Indicator from './Indicator.js'

export default Widget.Window({
  visible: true,
  anchor: ['top'],
  layer: 'overlay',
  name: 'indicator',
  child: Widget.EventBox({
    onHover: () => Indicator.popup(-1),
    child: Widget.Box({
      vertical: true,
      css: 'min-height: 2px;',
      children: [ Indicator ]
    })
  }),
})
