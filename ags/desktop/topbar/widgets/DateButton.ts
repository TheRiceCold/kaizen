import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'
import { showWidget } from 'lib/variables'
const { datemenu } = showWidget

const { interval, format } = options.topbar.datemenu

export default BarButton({
  window: 'datemenu',
  className: 'datemenu',
  onClicked(self) {
    datemenu.value = !datemenu.value
    self.toggleClassName('active', datemenu.value)
  },
  label: Utils.derive(
    [clock(interval), format],
    (c, f) => c.format(f) || ''
  ).bind(),
})
