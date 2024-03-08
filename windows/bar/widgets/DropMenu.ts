import PanelButton from './PanelButton'
import options from 'options'
import icons from 'data/icons'

const { action } = options.bar.dropmenu

export default () => PanelButton({
  window: 'dropmenu',
  onClicked: action.bind(),
  child: Widget.Icon(icons.ui.arrow.down),
})
