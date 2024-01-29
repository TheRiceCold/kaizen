import { PopupWindow } from '../../misc/main.js'
import Content from './content/main.js'

export default PopupWindow({
  child: Content,
  name: 'dashboard',
  anchor: [ 'top' ],
})
