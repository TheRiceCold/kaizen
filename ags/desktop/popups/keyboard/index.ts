import Keyboard from './keyboard'
import PopupRevealer from '../PopupRevealer'

import options from 'options'
import { showWidget } from 'lib/variables'

export default PopupRevealer({
  hpack: 'center',
  child: Keyboard,
  className: 'keyboard',
  transition: 'slide_up',
  reveal: showWidget.keyboard.bind(),
  spacing: options.theme.spacing * 1.5,
})
