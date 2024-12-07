import { GObject, register } from 'astal'
import { astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type FontButtonProps = ConstructProps<FontButton, Gtk.FontButton.ConstructProps, {} >

@register()
class FontButton extends astalify(Gtk.FontButton) {
  constructor(props: FontButton) {
    super(props as any)
    this.cursor = 'pointer'
  }
}

export default FontButton
