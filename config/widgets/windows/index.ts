const { Gtk } = imports.gi

export const RegularWindow = Widget.subclass<
  typeof Gtk.Window,
  Gtk.Window.ConstructorProperties
>(Gtk.Window)

export { default as RevealerWindow } from './RevealerWindow'
