import { type SwitchProps } from 'types/widgets/switch'
import { type ButtonProps } from 'types/widgets/button'
import options from 'options'

// TODO: Add switch or toggle for enabling and disabling
export default (
  label: string, 
  buttons: Array<ButtonProps|SwitchProps> = []
) => Widget.Box({
  className: 'header',
  children: [
    Widget.Label({ label, hexpand: true, xalign: 0 }),
    Widget.Box({
      children: buttons,
      spacing: options.theme.spacing * 0.75,
    })
  ],
})
