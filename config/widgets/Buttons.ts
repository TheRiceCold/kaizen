import { type ButtonProps } from 'types/widgets/button'
import { IconLabel } from './boxes'

const { Button, Icon } = Widget
type ClickedType = (self: ButtonProps) => void

export const ButtonLabel = (
  label: string,
  onClicked: ClickedType = () => { },
  { ...props }: ButtonProps = {}
) => Button({ label, onClicked, cursor: 'pointer', ...props })

export const ButtonIcon = (
  icon: string,
  onClicked: ClickedType = () => { },
  { ...props }: ButtonProps = {}
) => Button({ onClicked, cursor: 'pointer', ...props }, Icon({ icon }))

export const ButtonIconLabel = (
  icon: string,
  label: string,
  onClicked: ClickedType = () => { },
  { ...props }: ButtonProps = {}
) => Button(
  { cursor: 'pointer', onClicked, ...props },
  IconLabel(icon, label)
)
