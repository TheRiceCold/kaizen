import { GObject, register } from 'astal'
import { astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type ColorButtonProps = ConstructProps<ColorButton, Gtk.ColorButton.ConstructProps, {}>

@register()
class ColorButton extends astalify(Gtk.ColorButton) {
  constructor(props: ColorButton) {
    super(props as any)
    this.cursor = 'pointer'
  }
}

export default ColorButton
