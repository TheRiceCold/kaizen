import { VBox } from 'widgets'
import Progress from './TimeProgress'

const { Box, EventBox, Label } = Widget

const hour = Variable('', { poll: [4000, "date '+%I'"] })
const minute = Variable('', { poll: [2000, "date '+%M'"] })
const date = Variable('', { poll: [8000, "date '+%d %b %A'"] })

export default Box(
  { className: 'time-widget' },
  // Clock
  EventBox({
    vpack: 'center',
    cursor: 'pointer',
    className: 'clock',
    onPrimaryClick() { },
  }, VBox([
    Label({ className: 'date' }).bind('label', date),
    Label({ className: 'time', label: hour.bind().as((h: number) => h.toString()) }),
    Label({ className: 'time', label: minute.bind().as((m: number) => m.toString()) })
  ])),

  // Time ProgressBar
  Box(
    { vpack: 'center', className: 'progress' },
    Progress('year'), Progress('month'), Progress('week'), Progress('day')
  )
)
