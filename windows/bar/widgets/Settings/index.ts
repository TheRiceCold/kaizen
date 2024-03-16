import options from 'options'
import Network from './Network'
import BarButton from '../../BarButton'

const { action } = options.bar.settings
const battery = await Service.import('battery')

const setBatteryIcon = (p: number) => (p < 10) ? ' ' : (p < 30) ? ' ' : (p < 60) ? ' ' : (p < 90) ? ' ' : ' '

export default BarButton({
  window: 'dropmenu',
  onClicked: action.bind(),
  child: Widget.Box({
    spacing: options.theme.spacing ,
    children: [
      Network,
      Widget.Label({
        visible: battery.bind('available'),
        label: battery.bind('percent').as(setBatteryIcon),
      })
    ]
  })
})
