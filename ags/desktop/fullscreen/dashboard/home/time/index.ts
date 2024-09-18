import { showWidget } from 'lib/variables'
import Progress from './TimeProgress'

const hour = Variable('', { poll: [4000, "date '+%I'"] })
const minute = Variable('', { poll: [2000, "date '+%M'"] })
const date = Variable('', { poll: [8000, "date '+%d %b %A'"] })

const Clock = Widget.EventBox({
  vpack: 'center',
  cursor: 'pointer',
  className: 'clock',
  onPrimaryClick() {
    showWidget.calendar.value = !showWidget.calendar.value
  },
}, Widget.Box({vertical: true},
  Widget.Label({className: 'date'}).bind('label', date),
  Widget.Label({ className: 'time', label: hour.bind().as((h: number) => h.toString()) }),
  Widget.Label({ className: 'time', label: minute.bind().as((m: number) => m.toString()) })
))

export default Widget.Box({className: 'time-widget'},
  Clock, Widget.Box(
    { vpack: 'center', className: 'progress' },
    Progress('year'), Progress('month'), Progress('week'), Progress('day')
  )
)
