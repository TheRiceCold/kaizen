import { App, Utils, Widget } from '../../imports.js'
import { variables, icons } from '../../constants/main.js'

const { Gdk, Gtk } = imports.gi
const { SCREEN_WIDTH, SCREEN_HEIGHT } = variables
const WINDOW_NAME = 'powermenu'

const SessionButton = ({
  name, 
  icon, 
  exec = '',
  className,
}) => {
  const buttonDescription = Widget.Revealer({
    vpack: 'end',
    transitionDuration: 200,
    transition: 'slide_down',
    revealChild: false,
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
    exec: ['bash', '-c', 'loginctl terminate-user $USER']
  })

  const sleepButton = SessionButton({
    name: 'Sleep', 
    exec: 'systemctl suspend',
    icon: icons.powermenu.sleep,
  })

  const hibernateButton = SessionButton({
    name: 'Hibernate', 
    icon: 'downloading', 
    exec: 'systemctl hibernate'
  })

  const shutdownButton = SessionButton({
    name: 'Shutdown', 
    exec: 'systemctl poweroff',
    icon: icons.powermenu.shutdown,
  })

  const rebootButton = SessionButton({
    name: 'Reboot', 
    exec: 'systemctl reboot',
    icon: icons.powermenu.reboot, 
  })

  const cancelButton = SessionButton({
    name: 'Cancel', 
    icon: icons.powermenu.cancel, 
    className: 'session-button-cancel'
  })

  return Widget.Box({
    vertical: true,
    className: 'session-bg',
    css: `
      min-width: ${SCREEN_WIDTH * 1.5}px; 
      min-height: ${SCREEN_HEIGHT * 1.5}px;`,
    children: [
      Widget.Box({
        hpack: 'center',
        vexpand: true,
        vertical: true,
        children: [
          Widget.Box({
            vpack: 'center',
            vertical: true,
            className: 'spacing-v-15',
            children: [
              Widget.Box({
                vertical: true,
                css: 'margin-bottom: 0.682rem;',
                children: [
                  Widget.Label({ label: 'Session', className: 'txt-title txt' }),
                  Widget.Label({
                    className: 'txt-small txt',
                    justify: Gtk.Justification.CENTER,
                    label: 'Use arrow keys to navigate.\nEnter to select, Esc to cancel.'
                  }),
                ]
              }),
              Widget.Box({
                hpack: 'center',
                className: 'spacing-h-15',
                children: [ lockButton, logoutButton, sleepButton ]
              }),
              Widget.Box({
                hpack: 'center',
                className: 'spacing-h-15',
                children: [ hibernateButton, shutdownButton, rebootButton ]
              }),
              Widget.Box({
                hpack: 'center',
                className: 'spacing-h-15',
                children: [ cancelButton ]
              }),
            ]
          })
        ]
      })
    ],
    setup: self => self.hook(App, (_b, _, visible) => {
      if (visible) lockButton.grab_focus()
    })
  })
}
