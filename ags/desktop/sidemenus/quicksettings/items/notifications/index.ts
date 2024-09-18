import Header from '../Header'
import Content from './Content'
import { ButtonLabel } from 'widgets'

import options from 'options'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

export default Widget.Box({
  vertical: true,
  className: 'notifications',
  css: options.notifications.width.bind().as((w: number) => `min-width: ${w}px`),
}, Header('Notifications', [
  ButtonLabel(
    notifications.bind('dnd').as((p: boolean) => `Status: ${p ? 'silent' : 'active'}`),
    () => notifications.dnd = !notifications.dnd,
    { tooltipText: 'Click to toggle' }
  ),
  ButtonLabel('Clear', notifications.clear, { visible: notifs.as(n => n.length > 0) })
]), Content)
