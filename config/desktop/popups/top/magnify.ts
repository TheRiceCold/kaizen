import popups from 'service/popups'
import screen from 'service/screen'

import { ButtonIcon, ButtonLabel } from 'widgets'
import PopupRevealer from '../PopupRevealer'

export default PopupRevealer({
  hpack: 'center',
  className: 'magnify-popup',
  reveal: popups.bind('magnify-shown'),
  children: [
    ButtonIcon('minus-symbolic', () => screen.magnify(screen.magnify_level - 0.25)),
    ButtonLabel(
      screen.bind('magnify-level').as((a: number) => `${a * 100}%`),
      () => screen.magnify(1),
    ),
    ButtonIcon('plus-symbolic', () => screen.magnify(screen.magnify_level + 0.25)),
  ],
})
