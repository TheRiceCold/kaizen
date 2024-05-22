import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'

const { interval, format, action } = options.bar.datemenu

export default BarButton({
  window: 'datemenu',
  className: 'datemenu',
  onClicked: action.bind(),
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind(),
})
