import { Gtk } from 'astal/gtk3'
import { BoxProps, ScrollableProps } from 'astal/gtk3/widget'

import Group from './Group'

export default ({ name, children, ...props }: BoxProps) => (
  <box name={name} classNames={['page', name]} {...props}>
    <scrollable css='min-height: 300px;' hscroll={Gtk.PolicyType.NEVER}>
      <box vertical vexpand className='page-content'>
        {children}
      </box>
    </scrollable>
  </box>
)
