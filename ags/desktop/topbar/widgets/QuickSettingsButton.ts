import BarButton from '../BarButton'

import icons from 'data/icons'
import { showWidget } from 'lib/variables'

const { quicksettings } = showWidget
const { wifi } = await Service.import('network')
const battery = await Service.import('battery')
const notifications = await Service.import('notifications')

const BatteryIcon = Widget.Icon({ className: 'battery' }).hook(battery, self => {
  const { percent: p, charging, available } = battery

  self.visible = available
  self.tooltipText = p+'%'
  self.icon = battery['icon_name']
  self.toggleClassName('charging', charging)
  self.toggleClassName('error', p < 20 && !charging)
})

const NetworkIcon = Widget.Icon().bind('icon', wifi, 'icon_name')

const DNDIcon = Widget.Box({ className: 'notifications' }).hook(notifications, self => {
  const { dnd, notifications: notifs } = notifications
  const hasNotifs = notifs.length > 0

  const Label = Widget.Label(notifs.length+'')
  const Icon = Widget.Icon(icons.notifications[dnd ? 'silent' : 'default'])

  self.children = [ Icon, Label ]

  Label.visible = hasNotifs
  Icon.toggleClassName('active', hasNotifs)
})

export default BarButton({
  className: 'control-button',
  onClicked(self) {
    quicksettings.value = !quicksettings.value
    self.toggleClassName('active', quicksettings.value)
  },
  child: Widget.Box([ BatteryIcon, NetworkIcon, DNDIcon ]),
})
