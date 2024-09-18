import {Opt} from 'lib/option'
import Setter from './Setter'
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

export default <T>(props: RowProps<T>) => Widget.Box({
  className: 'item',
  attribute: { opt: props.opt },
  tooltipText: props.note ? `note: ${props.note}` : '',
  children: [
    Widget.Box(
      { vertical: true, vpack: 'center' },
      Widget.Label({ xalign: 0, label: props.title }),
      Widget.Label({
        xalign: 0,
        className: 'id',
        label: props.opt.id,
      }),
    ),
    Widget.Box({hexpand: true}),
    Widget.Box({vpack: 'center'}, Setter(props)),
    Widget.Button({
      vpack: 'center',
      className: 'reset',
      onClicked() { props.opt.reset() },
      sensitive: props.opt.bind().as((v: boolean) => v !== props.opt.initial),
    }, Widget.Icon(icons.ui.refresh))
  ]
})
