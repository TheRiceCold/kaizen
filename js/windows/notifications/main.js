import Music from './Music.js'
import Popups from './Popups.js'

export default Widget.Window({
  visible: true,
  layer: 'overlay',
  anchor: ['top'],
  name: 'notifications',
  child:  Widget.Box({
    className: 'notification',
    children: [ Popups, Music() ],
  })
})
