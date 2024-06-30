import { showWidget } from 'lib/variables'

const hour = Variable('', { poll: [4000, "date '+%I'"] })
const minute = Variable('', { poll: [2000, "date '+%M'"] })
const date = Variable('', { poll: [8000, "date '+%d %b %A'"] })

export default Widget.EventBox({
  cursor: 'pointer',
  className: 'clock',
  child: Widget.Box({ vertical: true },
    Widget.Label({ className: 'date' }).bind('label', date),
    Widget.Label({ className: 'time', label: hour.bind().as(h => h+'') }),
    Widget.Label({ className: 'time', label: minute.bind().as(m => m+'') })
  ),
  onPrimaryClick() {
    showWidget.datemenu.value = !showWidget.datemenu.value
  },
})
