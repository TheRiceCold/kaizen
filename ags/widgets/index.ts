import { type ButtonProps } from 'types/widgets/button'

const { Box, Button, Icon, Label } = Widget

export const VBox = (
  props: typeof Box | Widget[] = {},
  ...children: Widget
) => {
  if (Array.isArray(props))
    return Box({ vertical: true }, ...props)
  return Box({ vertical: true, ...props }, ...children)
}

export const ButtonLabel = (
  label: string,
  onClicked: (self: ButtonProps) => void = () => { },
  { ...props }: ButtonProps = {}
) => Button({ label, onClicked, cursor: 'pointer', ...props })

export const ButtonIcon = (
  icon: string,
  onClicked: (self: ButtonProps) => void = () => { },
  { ...props }: ButtonProps = {}
) => Button({ onClicked, cursor: 'pointer', ...props }, Icon(icon))

export const ButtonIconLabel = (
  icon: string,
  label: string,
  onClicked: (self: ButtonProps) => void = () => { },
  { ...props }: ButtonProps = {}
) => Button({ cursor: 'pointer', onClicked, ...props }, Box([Icon(icon), Label(label)]))

export const IconLabel = (
  icon: string,
  label: string,
  { ...props } = {}
) => Box({ ...props }, Icon(icon), Label(label))
