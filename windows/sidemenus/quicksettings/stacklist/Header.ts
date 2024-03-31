import { ButtonProps } from 'types/widgets/button'
import options from 'options'

// TODO: Add switch or toggle for enabling and disabling
export default (label: string, buttons: ButtonProps) => Widget.Box({
  className: 'header',
  children: [
    Widget.Label({ label, hexpand: true, xalign: 0 }),
    Widget.Box({
      spacing: options.theme.spacing * 0.75,
      children: buttons.map(props => Widget.Button(props))
    })
  ],
})
