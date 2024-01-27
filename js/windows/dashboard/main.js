import { PopupWindow } from '../../misc/main.js'
import Content from './content/main.js'

export default PopupWindow({
  focusable: true,
  child: Content,
  name: 'dashboard',
  anchor: [ 'top' ],
})
