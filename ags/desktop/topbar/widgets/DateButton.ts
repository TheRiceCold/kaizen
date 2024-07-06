import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'
import { showWidget } from 'lib/variables'

const { calendar } = showWidget
const { interval, format } = options.topbar.date

export default BarButton({
  className: 'datemenu',
  onClicked(self) {
    calendar.value = !calendar.value
    self.toggleClassName('active', calendar.value)
  },
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind(),
})
