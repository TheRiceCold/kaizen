import { Widget } from '../../imports.js'
import PowerMenu from './PowerMenu.js'

export default Widget.Window({
  popup: true,
  visible: false,
  focusable: true,
  layer: 'overlay',
  name: 'powermenu',
  exclusivity: 'ignore',
  child: PowerMenu(),
})
