import Header from '../Header'
import Content from './Content'

import options from 'options'
import icons from 'data/icons'
import { notificationIcon } from 'lib/variables'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

export default Widget.Box({
  vertical: true,
  className: 'notifications',
  css: options.notifications.width.bind().as(w => `min-width: ${w}px`),
  children: [
    Header('Notifications', [
      {
        child: Widget.Icon({ icon: notificationIcon }),
        onClicked: () => notifications.dnd = !notifications.dnd
      },
      {
        onClicked: notifications.clear,
        child: Widget.Icon(icons.ui.broom),
        sensitive: notifs.as(n => n.length > 0),
      }
    ]),
    Content
  ],
})
