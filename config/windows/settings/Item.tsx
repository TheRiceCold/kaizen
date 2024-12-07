import { bind, Binding, Variable } from 'astal'
import { Gtk } from 'astal/gtk3'

import Setter from './Setter'
import ResetButton from './ResetButton'

import icons from 'data/icons'
import { Option } from 'variables/option'

interface IProps {
  opt: Option
  max?: number
  min?: number
  note?: string
  desc?: string
  title?: string
  enums?: string[]
  visible?: boolean | Binding<boolean>
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
}

export default({ visible = true, ...props }: IProps) => (
  <box 
    vertical
    className='item'
    visible={visible}
    tooltipText={props.note ? `note: ${props.note}` : ''}
  >
    <box>
      <label className='title' label={props.title} />
      <box hexpand />
      <Setter {...props} />
      <ResetButton opt={props.opt} />
    </box>
    {props.desc && <label xalign={0} label={props.desc+'.'} className='description' />}
  </box>
)
