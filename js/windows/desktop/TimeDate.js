import { Widget } from '../../imports.js'
import { Clock } from '../../misc/main.js'

export default Widget.Box({
  hpack: 'end',
  vpack: 'end',
  vertical: true,
  className: 'time-date',
  children: [
    Clock({ className: 'time', format: '%I:%M %p' }),
    Clock({ className: 'date', format: '%A, %m/%d/%Y' })
  ],
})
