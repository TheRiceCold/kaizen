import options from 'options'
import icons from 'data/icons'
import BarButton from '../BarButton'

const { monochrome, action } = options.bar.powermenu

export default () => BarButton({
  window: 'powermenu',
  onClicked: action.bind(),
  child: Widget.Icon(icons.powermenu.shutdown),
  setup: self => self.hook(monochrome, () => {
    self.toggleClassName('colored', !monochrome.value)
    self.toggleClassName('box')
  }),
})
