import { type ButtonProps } from 'types/widgets/button'

import { ButtonLabel } from 'widgets'
import PopupRevealer from '../../PopupRevealer'

import { gromit, hyprland } from 'lib/utils'

const { action } = gromit

const ActionButtons = Widget.Box({
  className: 'control-buttons',
  children: [
    { label: 'Undo', onClicked() { action('undo') } },
    { label: 'Redo', onClicked() { action('redo') } },
    {
      label: 'Pin',
      onClicked(self: ButtonProps) {
        hyprland.dispatch('pin')
        self.label = self.label === 'Pin' ? 'Unpin' : 'Pin'
      }
    },
    {
      label: 'Blur',
      onClicked() { hyprland.dispatch() }
    },
    { label: 'Clear', onClicked() { action('clear') } },
    { label: 'Quit', onClicked() { action('quit') } },
  ].map(props => ButtonLabel(props.label, props.onClicked)),
})

export default PopupRevealer({
  vertical: true,
  hpack: 'center',
  className: 'draw-popup',
  reveal: hyprland.bindActiveClient('class', (c: string) => c === 'Gromit-mpx')
}, ActionButtons)
