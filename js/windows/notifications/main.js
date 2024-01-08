import { Widget } from '../../imports.js'

import Popups from './Popups.js'
import Music from './Music.js'

export default Widget.Window({
  layer: 'overlay',
  anchor: ['top'],
  name: 'notifications',
  child:  Widget.Box({
    className: 'osd-window',
    children: [ 
      Popups, 
      Music(),
    ],
  })
})
