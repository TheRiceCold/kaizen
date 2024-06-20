import BarButton from '../BarButton'

import icons from 'data/icons'
import { showWidget } from 'lib/variables'

const { quicksettings } = showWidget
const { wifi } = await Service.import('network')
const battery = await Service.import('battery')
const notifications = await Service.import('notifications')

const BatteryIcon = Widget.Icon({
  className: 'battery',
  icon: battery.bind('icon_name'),
  visible: battery.bind('available'),
}).hook(battery, self => {
  const { percent: p, charging } = battery
  self.toggleClassName('charging', charging)
  self.toggleClassName('error', p < 20 && !charging)
})

const DND = Widget.Icon().bind(
  'icon', notifications, 'dnd',
  dnd => dnd ? icons.notifications.silent : 'notification-symbolic'
)

export default BarButton({
  className: 'control-button',
  child: Widget.Box([
    BatteryIcon,
    Widget.Icon().bind('icon', wifi, 'icon_name'),
    DND,
  ]),
  onClicked(self) {
    quicksettings.value = !quicksettings.value
    self.toggleClassName('active', quicksettings.value)
  },
})
