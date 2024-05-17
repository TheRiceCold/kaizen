import 'lib/session'
import Lock from 'gi://GtkSessionLock'

import Container from './Container'
import options from 'options'

const { Gdk, Gtk } = imports.gi

const { scheme } = options.theme
export const windows = []
export const lock = Lock.prepare_lock()
export const fontColor = options.theme[scheme].fg

function createWindow(monitor) {
  const window = new Gtk.Window({ child: Container })
  const win = {window, monitor}
  windows.push(win)
  return win
}

function lockscreen() {
  const display = Gdk.Display.get_default()
  for (let m = 0;  m < display?.get_n_monitors();  m++) {
    const monitor = display?.get_monitor(m)
    createWindow(monitor)
  }
  display?.connect('monitor-added', (disp, monitor) => {
    const w = createWindow(monitor)
    lock.new_surface(w.window, w.monitor)
    w.window.show()
  })
  lock.lock_lock()
  windows.map(w => {
    lock.new_surface(w.window, w.monitor)
    w.window.show()
  })
}

function onFinished() {
  lock.destroy()
  windows.forEach(w => w.window.destroy())
  Gdk.Display.get_default()?.sync()
  App.quit()
}

lock.connect('finished', onFinished)
lockscreen()
