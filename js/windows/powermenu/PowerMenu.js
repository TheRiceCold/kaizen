import { App, Utils, Widget } from '../../imports.js'
import { variables } from '../../constants/main.js'

const { Gdk, Gtk } = imports.gi
const { SCREEN_WIDTH, SCREEN_HEIGHT } = variables

const SessionButton = (name, icon, command, props = {}) => {
  const buttonDescription = Widget.Revealer({
    vpack: 'end',
    transitionDuration: 200,
    transition: 'slide_down',
    revealChild: false,
    child: Widget.Label({
      className: 'txt-smaller session-button-desc',
      label: name,
    }),
  })
  return Widget.Button({
    onClicked: command,
    className: 'session-button',
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
    connections: [
      ['focus-in-event', self => {
        buttonDescription.revealChild = true
        self.toggleClassName('session-button-focused', true)
      }],
      ['focus-out-event', self => {
        buttonDescription.revealChild = false
        self.toggleClassName('session-button-focused', false)
      }],
    ],
    ...props,
  })
}

export default () => {
  // lock, logout, sleep
  const lockButton = SessionButton('Lock', '', () => {
    App.closeWindow('session')
    Utils.execAsync('gtklock')
  })
  const logoutButton = SessionButton('Logout', '󰍃', () => {
    App.closeWindow('session')
    Utils.execAsync(['bash', '-c', 'loginctl terminate-user $USER'])
  })
  const sleepButton = SessionButton('Sleep', '󰒲', () => {
    App.closeWindow('session')
    Utils.execAsync('systemctl suspend')
  })
  // hibernate, shutdown, reboot
  const hibernateButton = SessionButton('Hibernate', 'downloading', () => {
    App.closeWindow('session')
    Utils.execAsync('systemctl hibernate')
  })
  const shutdownButton = SessionButton('Shutdown', 'power_settings_new', () => {
    App.closeWindow('session')
    Utils.execAsync('systemctl poweroff')
  })
  const rebootButton = SessionButton('Reboot', '󰜉', () => {
    App.closeWindow('session')
    Utils.execAsync('systemctl reboot')
  })
  const cancelButton = SessionButton('Cancel', '󱎘',
    () => App.closeWindow('session'),
    { className: 'session-button-cancel' })
  return Widget.Box({
    vertical: true,
    className: 'session-bg',
    css: `
      min-width: ${SCREEN_WIDTH * 1.5}px; 
      min-height: ${SCREEN_HEIGHT * 1.5}px;`,
    children: [
      Widget.EventBox({
        onPrimaryClick: () => App.closeWindow('session'),
        onSecondaryClick: () => App.closeWindow('session'),
        onMiddleClick: () => App.closeWindow('session'),
      }),
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
                children: [ // lock, logout, sleep
                  lockButton,
                  logoutButton,
                  sleepButton,
                ]
              }),
              Widget.Box({
                hpack: 'center',
                className: 'spacing-h-15',
                children: [ // hibernate, shutdown, reboot
                  hibernateButton,
                  shutdownButton,
                  rebootButton,
                ]
              }),
              Widget.Box({
                hpack: 'center',
                className: 'spacing-h-15',
                children: [cancelButton]
              }),
            ]
          })
        ]
      })
    ],
    connections: [
      [App, (_b, visible) => {
        if (visible) lockButton.grab_focus()
      }],
    ],
  })
}
