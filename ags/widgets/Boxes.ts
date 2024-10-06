import { type BoxProps } from 'types/widgets/box'
import { type EventBoxProps } from 'types/widgets/eventbox'

const { Box, EventBox, Icon, Label } = Widget

export const VBox = (
  props: BoxProps | Widget[] = {},
  ...children: Widget
) => {
  if (Array.isArray(props))
    return Box({ vertical: true }, ...props)
  return Box({ vertical: true, ...props }, ...children)
}

export const IconLabel = (
  icon: string,
  label: string,
  { ...props } = {}
) => Box({ ...props }, Icon({ icon }), Label({ label }))

export const Padding = (name: string, {
  css = '',
  hexpand = true,
  vexpand = true,
}: EventBoxProps = {}) => EventBox({
  hexpand,
  vexpand,
  can_focus: false,
  setup(self: EventBoxProps) {
    self.on('button-press-event', () => App.toggleWindow(name))
  }
}, Box({ css }))