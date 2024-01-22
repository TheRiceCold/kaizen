import { PopupWindow } from '../../misc/main.js'
import PowerMenu from './PowerMenu.js'

export default PopupWindow({
  name: 'powermenu',
  exclusivity: 'ignore',
  child: PowerMenu(),
})
