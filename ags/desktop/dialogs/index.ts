import Settings from './settings'

const { Gtk } = imports.gi
export const DialogWindow = Widget.subclass<typeof Gtk.Window, Gtk.Window.ConstructorProperties>(Gtk.Window)

export default [Settings()]
