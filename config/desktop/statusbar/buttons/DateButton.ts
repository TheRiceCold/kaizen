import { type ButtonProps } from 'types/widgets/button'
import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'
import { showWidget } from 'lib/variables'

const { calendar } = showWidget
const { interval, format } = options.statusbar.date

export default BarButton({
  className: 'datemenu',
  onClicked(self: ButtonProps) {
    calendar.value = !calendar.value
    self.toggleClassName('active', calendar.value)
  },
  label: Utils.derive(
    [clock(interval), format],
    (c, f: string) => c.format(f) || ''
  ).bind(),
})
