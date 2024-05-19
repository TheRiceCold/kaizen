import BarButton from '../BarButton'
import options from 'options'
import icons from 'data/icons'

export default BarButton({
  window: 'powermenu',
  onClicked: options.bar.power.action.bind(),
  child: Widget.Icon({
    icon: icons.powermenu.shutdown,
  }),
})
