import { PopupWindow } from '../../../misc/main.js'
import SidebarRight from './SidebarRight.js'

export default PopupWindow({
  focusable: true,
  name: 'sideright',
  child: SidebarRight,
  anchor: ['right', 'top', 'bottom'],
})
