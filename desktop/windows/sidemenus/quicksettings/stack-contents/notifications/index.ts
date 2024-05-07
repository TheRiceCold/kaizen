import Header from '../Header'
import Content from './Content'

import options from 'options'
import { setupCursorHover } from 'misc/cursorhover'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

export default Widget.Box({
  vertical: true,
  className: 'notifications',
  css: options.notifications.width.bind().as(w => `min-width: ${w}px`),
  children: [
    Header('Notifications', [
      Widget.Button({
        setup: setupCursorHover,
        tooltipText: 'Click to toggle',
        onClicked() { notifications.dnd = !notifications.dnd },
        label: notifications.bind('dnd').as(p => `Status: ${p ? 'silent' : 'active'}`),
      }),

      Widget.Button({
        label: 'Clear',
        setup: setupCursorHover,
        onClicked: notifications.clear,
        visible: notifs.as(n => n.length > 0),
      })
    ]),
    Content
  ],
})
