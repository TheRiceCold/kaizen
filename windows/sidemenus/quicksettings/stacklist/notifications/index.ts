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
      Widget.Switch({
        active: !notifications.dnd,
        onActivate: () => notifications.dnd = !notifications.dnd, 
      }),
      Widget.Button({
        label: 'Clear',
        onClicked: notifications.clear,
        sensitive: notifs.as(n => n.length > 0),
      })
    ]),
    Content
  ],
})
