import 'lib/session'
import 'style/style'
import Lock from 'gi://GtkSessionLock'

import Clock from './Clock'

const { Gdk, Gtk } = imports.gi

const lock = Lock.prepare_lock()
const windows = []

function unlock() {
  for (const win of windows)
    win.window.child.children[0].revealChild = false

  Utils.timeout(500, () => {
    lock.unlock_and_destroy()
    windows.forEach(w => w.window.destroy())
    Gdk.Display.get_default()?.sync()
    App.quit()
  })
}

const Bar = Widget.CenterBox({
  startWidget: Widget.Box([
    Widget.Box([ ]),
  ]),
  endWidget: Widget.Box({ hpack: 'end' }, Clock)
})

const LoginBox = Widget.Box([
  Widget.Box({
    spacing: 16,
    vertical: true,
    vpack: 'center',
    hpack: 'center',
    children: [
      Widget.Box({ hpack: 'center', className: 'avatar' }),
      Widget.Box(
        { vertical: true, className: 'entry-box' },
        Widget.Label('Enter password:'),
        Widget.Separator(),
        Widget.Entry({
          xalign: 0.5,
          hpack: 'center',
          visibility: false,
          placeholderText: 'password',
          onAccept(self) {
            self.sensitive = false
            Utils.authenticate(self.text ?? '')
              .then(() => unlock())
              .catch(e => {
                self.text = ''
                self.parent.children[0].label = e.message
                self.sensitive = true
              })
          }
        }).on('realize', (entry) => entry.grab_focus()),
      )
    ]
  })
])

const LockWindow = () => new Gtk.Window({
  child: Widget.Box([
    Widget.Revealer({
      revealChild: false,
      transition: 'crossfade',
      transitionDuration: 500,
      child: Widget.Box(
        { vertical: true, className: 'lock-container' },
        Bar,
        Widget.Overlay({
          child: LoginBox,
          // overlays: [
          //   SessionBoxTooltip(),
          //   MprisCorner()
          // ]
        })
      )
    }).on('realize', self => Utils.idle(() => self.revealChild = true))
  ])
})

function createWindow(monitor) {
  const window = LockWindow()
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
