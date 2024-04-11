import './session'
import 'style/style'
import auth from './auth'
// import StatusBar from './statusbar'

const { Gtk, GLib } = imports.gi
const Window = Widget.subclass<typeof Gtk.Window, Gtk.Window.ConstructorProperties>(Gtk.Window)

App.config({
  icons: './assets/icons',
  windows: [
    Window({
      name: 'greeter',
      setup(self) {
        self.set_default_size(500, 500)
        self.show_all()
        auth.attribute.password.grab_focus()
      },
      child: Widget.Overlay({
        child: Widget.Box({ expand: true }),
        overlays: [
          Widget.Box({
            hexpand: true,
            hpack: 'fill',
            vpack: 'start',
            // child: StatusBar
          }),
          Widget.Box({
            child: auth,
            vpack: 'center',
            hpack: 'center',
          })
        ],
      })
    })
  ],
})
