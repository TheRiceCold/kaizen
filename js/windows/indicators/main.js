import { Widget } from '../../imports.js'
import Popups from './Popups.js'

export default Widget.Window({
  layer: 'overlay',
  name: 'indicators',
  anchor: ['top'],
  child:  Widget.Box({
    className: 'osd-window',
    children: [ 
      Popups 
    ],
  })
})
