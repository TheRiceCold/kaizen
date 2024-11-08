import { type NotificationJson } from 'types/service/notifications'

import { ButtonLabel, VBox } from 'widgets'
import Header from '../Header'
import Content from './Content'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

export default VBox(
  { className: 'notifications' },
  Header('Notifications', [
    ButtonLabel(
      notifications
        .bind('dnd')
        .as((p: boolean) => `Status: ${p ? 'silent' : 'active'}`),
      () => (notifications.dnd = !notifications.dnd),
      { tooltipText: 'Click to toggle' },
    ),
    ButtonLabel('Clear', notifications.clear, {
      visible: notifs.as((n: NotificationJson[]) => n.length > 0),
    }),
  ]),
  Content,
)
