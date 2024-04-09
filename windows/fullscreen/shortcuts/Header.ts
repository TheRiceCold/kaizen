export default Widget.Box({
  vertical: true,
  className: 'header',
  children: [
    Widget.Box({
      hpack: 'center',
      className: 'title',
      children: [
        Widget.Label({
          label: 'Shortcut keys',
          css: 'font-size: 3em; margin-right: 0.25em;',
        }),
        Widget.Label({
          label: '⌘ + Slash',
          css: 'font-size: 2em;',
          className: 'cheatsheet-key',
        }),
      ]
    }),
    Widget.Label({
      useMarkup: true,
      selectable: true,
      className: 'data-stored',
      justify: imports.gi.Gtk.Justification.CENTER,
      label: 'Sheet data stored in <tt>~/.config/ags/data/shortcuts.ts</tt>'
    }),
    Widget.Label({
      className: 'data-stored',
      justify: imports.gi.Gtk.Justification.CENTER,
      label: 'Window Directions: h = left, j = down, k = up, l = right'
    }),
  ]
})
