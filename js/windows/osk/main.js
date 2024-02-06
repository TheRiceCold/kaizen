import { PopupWindow } from '../../misc/main.js'
import OnScreenKeyboard from './Osk.js'

export default PopupWindow({
  name: 'osk',
  anchor: ['bottom'],
  child: OnScreenKeyboard
})
