import options from 'options'
import BarButton from '../BarButton'

const { action } = options.bar.profilemenu

export default () => BarButton({
  window: 'profilemenu',
  onClicked: action.bind(),
  child: Widget.Label(''),
})
