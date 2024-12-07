import { register } from 'astal'
import { App, astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type RegularWindowProps = ConstructProps<RegularWindow, Gtk.Window.ConstructProps, {} >

@register()
class RegularWindow extends astalify(Gtk.Window) {
  constructor(props: RegularWindowProps) {
    super(props as any)
    this.application = App
  }
}

export default RegularWindow
