import { GObject, property, register } from 'astal'
import { astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type SpinButtonProps = ConstructProps<SpinButton, Gtk.SpinButton.ConstructProps, {}>

@register({ CssName: 'spinbutton' })
class SpinButton extends astalify(Gtk.SpinButton) {
  constructor(props: SpinButton) {
    super(props as any)
    this.cursor = 'pointer'
  }

  get range() { return this.get_range() }
  set range([min, max]: [number, number]) {
    if (typeof min === 'number' && typeof max === 'number')
      this.set_range(min, max)
  }

  get increments() { return this.get_increments() }
  set increments([step, page]: [number, number]) {
    if (typeof step === 'number' && typeof page === 'number')
      this.set_increments(step, page)
  }
}

export default SpinButton
