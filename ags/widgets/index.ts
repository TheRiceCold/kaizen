import { type ButtonProps } from 'types/widgets/button'

export const ButtonLabel = (
  label: string,
  onClicked: (self: ButtonProps) => void = () => {},
  { ...props }: ButtonProps = {}
) => Widget.Button({ label, onClicked, cursor: 'pointer', ...props })

export const ButtonIcon = (
  icon: string,
  onClicked: (self: ButtonProps) => void = () => {},
  { ...props }: ButtonProps = {}
) => Widget.Button({ onClicked, cursor: 'pointer', ...props }, Widget.Icon(icon))

export const ButtonIconLabel = (
  icon: string,
  label: string,
  onClicked: (self: ButtonProps) => void = () => {},
  { ...props }: ButtonProps = {}
) => Widget.Button({ cursor: 'pointer', onClicked, ...props }, Widget.Box([ Widget.Icon(icon), Widget.Label(label) ]))
