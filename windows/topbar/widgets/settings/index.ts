import options from 'options'
import Battery from './Battery'
import Network from './Network'
import BarButton from '../../BarButton'

const { action } = options.bar.settings

export default () => BarButton({
  window: 'dropmenu',
  onClicked: action.bind(),
  child: Widget.Box({
    children: [ Network, Battery ],
    spacing: options.theme.spacing * 1.75,
  })
})
