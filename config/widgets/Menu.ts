import { GObject } from 'astal'
import { astalify, ConstructProps, Gtk } from 'astal/gtk3'

export type MenuProps = ConstructProps<Menu, Gtk.Menu.ConstructProps, {}>

export default class Menu extends astalify(Gtk.Menu) {
  static { GObject.registerClass(this) }

  constructor(props?: MenuProps) {
    super(props as any)
  }
}
