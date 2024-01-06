import { PopupWindow } from '../../../misc/main.js'
import SidebarRight from './SidebarRight.js'

export default PopupWindow({
  focusable: true,
  name: 'sideright',
  child: SidebarRight(),
  showClassName: 'sideright-show',
  hideClassName: 'sideright-hide',
  anchor: ['right', 'top', 'bottom'],
})
