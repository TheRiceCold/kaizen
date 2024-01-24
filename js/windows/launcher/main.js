import { PopupWindow } from '../../misc/main.js'
import Launcher from './Launcher.js'

const WINDOW_NAME = 'launcher'

export default PopupWindow({ 
  name: WINDOW_NAME, 
  child: Launcher(WINDOW_NAME),
})
