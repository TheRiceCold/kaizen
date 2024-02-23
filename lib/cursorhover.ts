const { Gdk } = imports.gi

export function setupCursorHover(btn) { // Hand pointing cursor on hover
  const display = Gdk.Display.get_default()
  btn.connect('enter-notify-event', () => {
    const cursor = Gdk.Cursor.new_from_name(display, 'pointer')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const cursor = Gdk.Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}

export function setupCursorHoverAim(btn) { // Crosshair cursor on hover
  btn.connect('enter-notify-event', () => {
    const display = Gdk.Display.get_default()
    const cursor = Gdk.Cursor.new_from_name(display, 'crosshair')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const display = Gdk.Display.get_default()
    const cursor = Gdk.Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}

export function setupCursorHoverGrab(btn) { // Hand ready to grab on hover
  btn.connect('enter-notify-event', () => {
    const display = Gdk.Display.get_default()
    const cursor = Gdk.Cursor.new_from_name(display, 'grab')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const display = Gdk.Display.get_default()
    const cursor = Gdk.Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}

export function setupCursorHoverInfo(btn) { // "?" mark cursor on hover
  const display = Gdk.Display.get_default()
  btn.connect('enter-notify-event', () => {
    const cursor = Gdk.Cursor.new_from_name(display, 'help')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const cursor = Gdk.Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}
