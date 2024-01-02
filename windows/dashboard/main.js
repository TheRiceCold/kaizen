import { Widget } from '../../imports.js'
import { PopupWindow } from '../../misc/main.js'

import DateColumn from './DateColumn.js'
import NotificationColumn from './NotificationColumn.js'
import options from '../../options.js'

export default  PopupWindow({
  name: 'dashboard',
  connections: [[options.bar.position, self => {
    self.anchor = ['top', 'right']
    self.transition = 'slide_down'
  }]],
  child: Widget.Box({
    className: 'dashboard',
    children: [
      NotificationColumn(),
      Widget.Separator({ orientation: 1 }),
      DateColumn(),
    ],
  }),
})
