import { Gtk } from 'astal/gtk3'
import { LabelProps } from 'astal/gtk3/widget'

export default (props: LabelProps) => (
  <label 
    {...props} 
  	className='section-title' 
  	halign={Gtk.Align.CENTER}
  />
)
