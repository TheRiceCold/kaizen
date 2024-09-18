import { type SwitchProps } from 'types/widgets/switch'
import { type ButtonProps } from 'types/widgets/button'

export default (
  label: string,
  buttons: Array<ButtonProps|SwitchProps> = []
) => Widget.Box({ className: 'header' },
  Widget.Label({ label, xalign: 0, hexpand: true }),
  Widget.Box({ children: buttons })
)
