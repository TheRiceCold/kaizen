import PanelButton from './PanelButton'
import options from 'options'
import { clock } from 'lib/variables'

const { format, action } = options.bar.date

const Time = Widget.Label({
  label: Utils.derive([clock, format], (c, f) => c.format(f) || '').bind()
})

export default () => PanelButton({
  child: Time,
  window: 'dashboard',
  onClicked: action.bind(),
})
