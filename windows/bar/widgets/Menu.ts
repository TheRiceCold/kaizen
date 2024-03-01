import PanelButton from './PanelButton'
import options from 'options'
import icons from 'data/icons'

const { action } = options.bar.utils

export default () => PanelButton({
  window: 'menu',
  onClicked: action.bind(),
  child: Widget.Icon(icons.ui.arrow.down),
})
