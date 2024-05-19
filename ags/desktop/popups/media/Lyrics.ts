const { GLib, Gtk, Vte } = imports.gi

export default () => {
  const Terminal = Widget.subclass(Vte.Terminal, 'AgsVteTerminal')

  const terminal = Terminal({ className: 'terminal', name: 'lyrics-terminal' })

  // HACK: style context is only accessable after the widget was added to the
  // hierachy, so i do this to set the color once.
  terminal.on('realize', () => {
    const bgCol = terminal.get_style_context()
      .get_property('background-color', Gtk.StateFlags.NORMAL)
    terminal.set_color_background(bgCol)
  })

  // TODO: set these colors via css
  terminal.spawn_async(
    Vte.PtyFlags.DEFAULT,
    GLib.get_home_dir(),
    [
      'sptlrx',
      '--current',
      '#cba6f7,bold',
      '--before',
      '#3e3e4e,faint,italic',
      '--after',
      '#a6adc8,faint',
    ],
    [],
    GLib.SpawnFlags.SEARCH_PATH,
    null,
    GLib.MAXINT32,
    null,
    null,
  )
  return terminal
}
