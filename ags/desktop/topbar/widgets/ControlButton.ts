import BarButton from '../BarButton'

import options from 'options'
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
  onClicked(self) {
    quicksettings.value = !quicksettings.value
    self.toggleClassName('active', quicksettings.value)
  },
  child: Widget.Box(
    { spacing: options.theme.spacing * 1.75 },
    DND, Widget.Icon({ icon: wifi.bind('icon_name') }), BatteryIcon
  )
})
