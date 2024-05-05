import BarButton from '../BarButton'
import options from 'options'
import { notificationIcon } from 'lib/variables'

const { action } = options.bar.settings
const { wifi } = await Service.import('network')

const battery = await Service.import('battery')

const BatteryIcon = Widget.Label({
  className: 'battery',
}).hook(battery, self => {
  const { percent: p, charging, available } = battery
  self.visible = available
  self.toggleClassName('charging', charging)
  self.toggleClassName('error', p < 20 && !charging)
  self.label = (p < 10) ? ' ' : (p < 30) ? ' ' : (p < 60) ? ' ' : (p < 90) ? ' ' : ' '
})

const DND = Widget.Icon({ icon: notificationIcon })

export default BarButton({
  window: 'dropmenu',
  onClicked: action.bind(),
  child: Widget.Box(
    { spacing: options.theme.spacing * 1.75 },
    DND, Widget.Icon({ icon: wifi.bind('icon_name') }), BatteryIcon
  )
})
