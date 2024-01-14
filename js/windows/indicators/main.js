import { Widget } from '../../imports.js'
import Indicator from './Indicator.js'

export default Widget.Window({
  layer: 'overlay',
  name: 'indicators',
  anchor: ['top', 'left'],
  child:  Widget.Box({
    className: 'osd-window',
    children: [ Indicator ],
  })
})
