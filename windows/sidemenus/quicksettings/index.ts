import icons from 'data/icons'
import Avatar from './Avatar'
import ClockBox from './ClockBox'
import Notifications from './notifications'
import { sh } from 'lib/utils'

const SysButtons = [
  Widget.Button({
    vpack: 'center',
    onClicked: () => sh('hyprlock'),
    child: Widget.Icon(icons.ui.lock),
  }),
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.powermenu.shutdown),
    onClicked: () => App.openWindow('powermenu'),
  })
]

const { wifi } = await Service.import('network')
const bluetooth = await Service.import('bluetooth')
const notifications = await Service.import('notifications')

export default Widget.Box({
  vertical: true,
  className: 'profile',
  children: [
    Widget.Box({ 
      className: 'header', 
      children: [ Avatar, ClockBox ].concat(SysButtons)
    }), 
    Widget.Box({
      hexpand: true,
      hpack: 'center',
      children:[
        Widget.Button({ 
          child: Widget.Box([ 
            Widget.Icon(icons.notifications.silent),
            Widget.Icon(icons.ui.arrow.right),
          ])
        }),
        Widget.Button({
          child: Widget.Box([ 
            Widget.Icon({ icon: wifi.bind('icon_name') }),
            Widget.Icon(icons.ui.arrow.right),
          ])
        }),
        Widget.Button({
          child: Widget.Box([ 
            Widget.Icon({ icon: bluetooth.bind('enabled').as(p => icons.bluetooth[p ? 'enabled' : 'disabled']) }),
            Widget.Icon(icons.ui.arrow.right),
          ])
        }),
        Widget.Button({
          child: Widget.Box([ 
            Widget.Icon(icons.audio.type.speaker),
            Widget.Icon(icons.ui.arrow.right),
          ])
        }),
        Widget.Button({ child: Widget.Icon(icons.color.dark) }),
        Widget.Button({ child: Widget.Icon(icons.ui.cup) }),
      ]
    }),
    Notifications
  ]
})
