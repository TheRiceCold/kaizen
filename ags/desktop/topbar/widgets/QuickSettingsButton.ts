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

const DNDIcon = Widget.Overlay({
  className: 'notifications',
  child: Widget.Icon({
    icon: notifications.bind('dnd')
      .as(dnd => icons.notifications[dnd ? 'silent' : 'default']),
    className: notifications.bind('notifications')
      .as(n => n.length > 0 ? 'active' : '')
  }),
  overlay: Widget.Label({
    hpack: 'end', vpack: 'end',
    visible: notifications.bind('notifications').as(n => n.length > 0),
    label: notifications.bind('notifications').as(n => n.length.toString()),
  })
})

export default BarButton({
  className: 'control-button',
  child: Widget.Box([ BatteryIcon, NetworkIcon, DNDIcon ]),
  onClicked(self) {
    quicksettings.value = !quicksettings.value
    self.toggleClassName('active', quicksettings.value)
  },
})
