import { Opt } from 'lib/option'
import Setter from './Setter'

import { VBox } from 'widgets'

import icons from 'data/icons'

export type RowProps<T> = {
  opt: Opt<T>
  title: string
  note?: string
  type?:
  | 'number'
  | 'color'
  | 'float'
  | 'object'
  | 'string'
  | 'enum'
  | 'boolean'
  | 'img'
  | 'font'
  enums?: string[]
  max?: number
  min?: number
}

const { Box, Button, Icon, Label } = Widget

export default <T>(props: RowProps<T>) => Box({
  className: 'item',
  attribute: { opt: props.opt },
  tooltipText: props.note ? `note: ${props.note}` : '',
  children: [
    VBox(
      { vpack: 'center' },
      Label({ xalign: 0, label: props.title }),
      Label({ xalign: 0, className: 'id', label: props.opt.id }),
    ),
    Box({ hexpand: true }),
    Box({ vpack: 'center' }, Setter(props)),
    Button({
      vpack: 'center',
      className: 'reset',
      onClicked() { props.opt.reset() },
      sensitive: props.opt.bind().as((v: boolean) => v !== props.opt.initial),
    }, Icon(icons.ui.refresh))
  ]
})
