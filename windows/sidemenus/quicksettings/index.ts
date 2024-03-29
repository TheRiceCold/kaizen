import { type Props as RevealerProps } from 'types/widgets/label'

import Avatar from './Avatar'
import ClockBox from './ClockBox'
import Notifications from './Notifications'

import options from 'options'
import icons from 'data/icons'
import { sidemenuShow } from 'lib/variables'

const SysButtons = [
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.ui.settings),
    onClicked: () => App.openWindow('settings-dialog')
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

const StackButton = icon => Widget.Button({ 
  child: Widget.Box([ 
    Widget.Icon({ icon }),
    Widget.Icon({
      className: 'arrow-icon', 
      icon: icons.ui.arrow.down 
    }),
  ])
})

const ControlButtons = Widget.Box({
  className: 'control-buttons',
  child: Widget.Box({ 
    hexpand: true,
    hpack: 'center',
    children: [
      StackButton(icons.notifications.silent),
      StackButton(wifi.bind('icon_name')),
      StackButton(bluetooth.bind('enabled').as(p => icons.bluetooth[p ? 'enabled' : 'disabled'])),
      StackButton(icons.audio.type.speaker),

      Widget.Button({ child: Widget.Icon(icons.color.dark) }),
      Widget.Button({ child: Widget.Icon(icons.ui.cup) }),
    ]
  })
})

const QuickSettings = Widget.Box({
  vertical: true,
  className: 'quicksettings',
  children: [
    Widget.Box({ 
      className: 'profile', 
      children: [ Avatar, ClockBox ].concat(SysButtons)
    }), 
    ControlButtons,
    Notifications
  ]
})

export default Widget.Revealer({
  child: QuickSettings,
  transition: 'slide_down',
  transitionDuration: options.transition.value,
}).hook(sidemenuShow.quicksettings, (self: RevealerProps) => self.revealChild = sidemenuShow.quicksettings.value)
