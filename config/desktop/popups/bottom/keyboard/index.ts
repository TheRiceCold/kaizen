import popups from 'service/popups'

import Keyboard from './keyboard'
import PopupRevealer from '../../PopupRevealer'

export default PopupRevealer({
  hpack: 'center',
  transition: 'slide_up',
  className: 'keyboard-popup',
  reveal: popups.bind('keyboard-shown'),
}, Keyboard)
