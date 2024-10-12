import Keyboard from './keyboard'
import PopupRevealer from '../PopupRevealer'

import { showWidget } from 'lib/variables'

export default PopupRevealer({
  hpack: 'center',
  className: 'keyboard',
  transition: 'slide_up',
  reveal: showWidget.keyboard.bind(),
}, Keyboard)
