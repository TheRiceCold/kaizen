import { type ButtonProps } from 'types/widgets/button'

import popups from 'service/popups'
import BarButton from '../BarButton'

import options from 'options'
import { clock } from 'lib/variables'

const { interval, format } = options.statusbar.date

export default BarButton({
  className: 'datemenu',
  label: Utils.derive(
    [clock(interval), format],
    (c, f: string) => c.format(f) || ''
  ).bind(),
  onClicked(self: ButtonProps) {
    popups.toggle('calendar')
    self.toggleClassName('active', popups['calendar-shown'])
  },
})
