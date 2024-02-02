import { App, Utils, Widget } from '../../imports.js'
import { icons } from '../../constants/main.js'

const { Gdk, Gtk } = imports.gi
const WINDOW_NAME = 'powermenu'

const SessionButton = ({
  name, 
  icon, 
  exec = '',
  className,
}) => {
  const buttonDescription = Widget.Revealer({
    vpack: 'end',
    revealChild: false,
    transitionDuration: 200,
    transition: 'slide_down',
    child: Widget.Label({
      label: name,
      className: 'txt-smaller session-button-desc',
    }),
  })

  return Widget.Button({
    onClicked: () => {
      App.closeWindow(WINDOW_NAME)
      if (exec) 
        Utils.execAsync(exec)
    },
    className: `session-button ${className}`,
    child: Widget.Overlay({
      className: 'session-button-box',
      child: Widget.Label({
        label: icon,
        vexpand: true,
        className: 'icon-material',
      }),
      overlays: [buttonDescription]
    }),
    onHover: button => {
      const display = Gdk.Display.get_default()
      const cursor = Gdk.Cursor.new_from_name(display, 'pointer')
      button.get_window().set_cursor(cursor)
      buttonDescription.revealChild = true
    },
    onHoverLost: button => {
      const display = Gdk.Display.get_default()
      const cursor = Gdk.Cursor.new_from_name(display, 'default')
      button.get_window().set_cursor(cursor)
      buttonDescription.revealChild = false
    },
    setup: self => self.on(
      'focus-in-event', self => {
        buttonDescription.revealChild = true
        self.toggleClassName('session-button-focused', true)
      }).on('focus-out-event', self => {
      buttonDescription.revealChild = false
      self.toggleClassName('session-button-focused', false)
    }),
  })
}

export default () => {
  const lockButton = SessionButton({
    name: 'Lock', 
    exec: 'swaylock',
    icon: icons.powermenu.lock, 
  })

  const logoutButton = SessionButton({
    name: 'Logout', 
    icon: icons.powermenu.logout, 
    exec: ['bash', '-c', 'pkill Hyprland']
  })

  const sleepButton = SessionButton({
    name: 'Sleep', 
    exec: 'systemctl suspend',
    icon: icons.powermenu.sleep,
  })

  const rebootButton = SessionButton({
    name: 'Reboot', 
    exec: 'systemctl reboot',
    icon: icons.powermenu.reboot, 
  })

  const hibernateButton = SessionButton({
    name: 'Hibernate', 
    exec: 'systemctl hibernate',
    icon: icons.powermenu.hibernate,
  })

  const shutdownButton = SessionButton({
    name: 'Shutdown', 
    exec: 'systemctl poweroff',
    icon: icons.powermenu.shutdown,
  })

  return Widget.Box({
    vertical: true,
    hpack: 'center',
    className: 'powermenu',
    children: [
      Widget.Box({
        vpack: 'center',
        vertical: true,
        className: 'spacing-v-15',
        children: [
          Widget.Label({
            className: 'txt-small txt',
            justify: Gtk.Justification.CENTER,
            label: 'Use arrow keys to navigate.\nEnter to select, Esc to cancel.'
          }),
          Widget.Box({
            hpack: 'center',
            className: 'spacing-h-15',
            children: [ lockButton, logoutButton, sleepButton ]
          }),
          Widget.Box({
            hpack: 'center',
            className: 'spacing-h-15',
            children: [ rebootButton, hibernateButton, shutdownButton ]
          })
        ]
      })
    ],
    setup: self => self.hook(App, (_b, _, visible) => {
      if (visible) 
        lockButton.grab_focus()
    })
  })
}
