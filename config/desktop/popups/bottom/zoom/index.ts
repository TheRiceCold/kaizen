import popups from 'service/popups'
import screen from 'service/screen'

import { ButtonIcon, ButtonLabel } from 'widgets'
import PopupRevealer from '../../PopupRevealer'

import icons from 'data/icons'

export default PopupRevealer({
  hpack: 'center',
  transition: 'slide_up',
  className: 'zoom-popup',
  reveal: popups.bind('zoom-shown'),
  children: [
    ButtonIcon(
      icons.ui.arrow.down,
      () => popups['zoom-shown'] = false,
      { className: 'zoom-button' }
    ),
    ButtonIcon(
      'minus-symbolic',
      () => screen.zoom(screen.zoom_amount - 0.25),
      { className: 'zoom-button' }
    ),
    ButtonLabel(
      screen.bind('zoom-amount').as((a: number) => `${a * 100}%`),
      () => screen.zoom(1),
    ),
    ButtonIcon(
      'plus-symbolic',
      () => screen.zoom(screen.zoom_amount + 0.25),
      { className: 'zoom-button' }
    ),
  ],
})
