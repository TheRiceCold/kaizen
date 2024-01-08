import { PopupWindow } from '../../../misc/main.js'
import SidebarLeft from './SidebarLeft.js'

export default PopupWindow({
  focusable: true,
  name: 'sideleft',
  anchor: ['left', 'top', 'bottom'],
  child: SidebarLeft(),
})
