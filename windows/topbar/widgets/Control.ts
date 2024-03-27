import { LabelProps } from 'types/widgets/label'
import BarButton from '../BarButton'
import icons from 'data/icons'
import options from 'options'

const { action } = options.bar.settings
const { wifi } = await Service.import('network')

const battery = await Service.import('battery')
const notifications = await Service.import('notifications')

const BatteryIcon = Widget.Label().hook(battery, (self: LabelProps) => {
  const { percent: p, charging, available } = battery
  self.visible = available
  self.toggleClassName('charging', charging)
  self.toggleClassName('error', p < 20 && !charging)
  self.label = (p < 10) ? ' ' : (p < 30) ? ' ' : (p < 60) ? ' ' : (p < 90) ? ' ' : ' '
})

const DND = Widget.Icon({
  visible: notifications.bind('dnd'),
  icon: icons.notifications.silent,
})

export default () => BarButton({
  window: 'dropmenu',
  onClicked: action.bind(),
  child: Widget.Box({
    children: [ DND, Widget.Icon({ icon: wifi.bind('icon_name') }), BatteryIcon ],
    spacing: options.theme.spacing * 1.75,
  })
})
