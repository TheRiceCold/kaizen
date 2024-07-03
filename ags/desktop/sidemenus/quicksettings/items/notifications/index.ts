import Header from '../Header'
import Content from './Content'

import options from 'options'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

export default Widget.Box({
  vertical: true,
  className: 'notifications',
  css: options.notifications.width.bind().as(w => `min-width: ${w}px`),
  children: [
    Header('Notifications', [
      Widget.Button({
        cursor: 'pointer',
        tooltipText: 'Click to toggle',
        onClicked() { notifications.dnd = !notifications.dnd },
        label: notifications.bind('dnd').as(p => `Status: ${p ? 'silent' : 'active'}`),
      }),

      Widget.Button({
        label: 'Clear',
        cursor: 'pointer',
        onClicked: notifications.clear,
        visible: notifs.as(n => n.length > 0),
      })
    ]),
    Content
  ],
})
