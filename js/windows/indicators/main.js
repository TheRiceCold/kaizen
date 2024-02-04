import Music from './Music.js'
import Popups from './Popups.js'
import Indicator from './Indicator.js'

export default Widget.Window({
  visible: true,
  anchor: ['top'],
  layer: 'overlay',
  name: 'indicator',
  child: Widget.Box({
    css: 'min-height: 2px;',
    children: [ 
      Indicator,
      Popups,
      Music() 
    ]
  }),
})
