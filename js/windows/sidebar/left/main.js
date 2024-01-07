import { PopupWindow } from '../../../misc/main.js'
import SidebarLeft from './SidebarLeft.js'

export default PopupWindow({
  focusable: true,
  name: 'sideleft',
  // exclusivity: 'exclusive',
  showClassName: 'sideleft-show',
  hideClassName: 'sideleft-hide',
  anchor: ['left', 'top', 'bottom'],
  child: SidebarLeft(),
})
