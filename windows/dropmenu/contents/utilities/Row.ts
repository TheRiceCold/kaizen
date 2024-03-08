export default (
  toggles: Array<() => Gtk.Widget> = [],
  menus: Array<() => Gtk.Widget> = [],
) => Widget.Box({
  vertical: true,
  children: [
    Widget.Box({
      homogeneous: true,
      className: 'row horizontal',
      children: toggles.map(w => w()),
    }),
    ...menus.map(w => w()),
  ],
})
