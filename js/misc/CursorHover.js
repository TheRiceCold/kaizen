const { Cursor, Display } = imports.gi.Gdk

export function setupCursorHover(btn) {
  const display = Display.get_default()
  btn.connect('enter-notify-event', () => {
    const cursor = Cursor.new_from_name(display, 'pointer')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const cursor = Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}

export function setupCursorHoverAim(btn)  {
  btn.connect('enter-notify-event', () => {
    const display = Display.get_default()
    const cursor = Cursor.new_from_name(display, 'crosshair')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const display = Display.get_default()
    const cursor = Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}

export function setupCursorHoverGrab(btn) {
  btn.connect('enter-notify-event', () => {
    const display = Display.get_default()
    const cursor = Cursor.new_from_name(display, 'grab')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const display = Display.get_default()
    const cursor = Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}

export function setupCursorHoverInfo(btn) {
  const display = Display.get_default()
  btn.connect('enter-notify-event', () => {
    const cursor = Cursor.new_from_name(display, 'help')
    btn.get_window().set_cursor(cursor)
  })

  btn.connect('leave-notify-event', () => {
    const cursor = Cursor.new_from_name(display, 'default')
    btn.get_window().set_cursor(cursor)
  })
}
