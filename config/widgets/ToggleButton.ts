import { GObject, register } from 'astal'
import { astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type ToggleButtonProps = ConstructProps<ToggleButton, Gtk.ToggleButton.ConstructProps, {}>

@register()
class ToggleButton extends astalify(Gtk.ToggleButton) {
  constructor(props: ToggleButton) {
    super(props as any)
    this.cursor = 'pointer'
  }
}

export default ToggleButton
