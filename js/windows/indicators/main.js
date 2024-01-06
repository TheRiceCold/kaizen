import { Widget } from '../../imports.js'
import Popups from './Popups.js'
import Music from './Music.js'

export default Widget.Window({
  layer: 'overlay',
  name: 'indicator',
  anchor: ['top'],
  child:  Widget.Box({
    className: 'osd-window',
    children: [ 
      Popups, 
      Music()
    ],
  })
})
