import screen from 'service/screen'

import { type ButtonProps } from 'types/widgets/button'

import { ButtonLabel } from 'widgets'
import PopupRevealer from '../PopupRevealer'

import { capitalize, hyprland } from 'lib/utils'

const ActionButton = (arg: string) =>
  ButtonLabel(capitalize(arg), () => screen.drawAction(arg))

export default PopupRevealer({
  homogeneous: true,
  className: 'draw-popup',
  reveal: hyprland.bindActiveClient('class', (c: string) => c === 'Gromit-mpx'),
  children: [
    ActionButton('undo'),
    ActionButton('redo'),
    ButtonLabel('Pin', (self: ButtonProps) => {
      hyprland.dispatch('pin')
      self.label = self.label === 'Pin' ? 'Unpin' : 'Pin'
    }),
    //ButtonLabel('Blur', (self: ButtonProps) => {
    //  screen.toggleBlur()
    //  self.toggleClassName('active', screen.blur_enabled)
    //}),
    ActionButton('clear'),
    ButtonLabel('Quit', () => {
      screen.blur_enabled = false
      screen.drawAction('quit')
    }),
  ],
})
