import { type RevealerProps } from 'types/widgets/revealer'
import { type Notification as Notif } from 'types/service/notifications'

import { VBox, Notification } from 'widgets'

import options from 'options'
import icons from 'data/icons'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

const Animated = (n: Notif) => Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  setup(self: RevealerProps) {
    Utils.timeout(options.transition.value, () => {
      if (!self.is_destroyed) self.revealChild = true
    })
  }
}, Notification(n))

const NotificationList = () => {
  const map: Map<number, ReturnType<typeof Animated>> = new Map
  const box = VBox({
    children: notifications.notifications.map(n => {
      const w = Animated(n)
      map.set(n.id, w)
      return w
    }),
    visible: notifs.as(n => n.length > 0),
  })

  function remove(_: unknown, id: number) {
    const n = map.get(id)
    if (n) {
      n.revealChild = false
      Utils.timeout(options.transition.value, () => {
        n.destroy()
        map.delete(id)
      })
    }
  }

  return box.hook(notifications, remove, 'closed').hook(
    notifications, (_, id: number) => {
      if (id !== undefined) {
        if (map.has(id)) remove(null, id)

        const n = notifications.getNotification(id)!

        const w = Animated(n)
        map.set(id, w)
        box.children = [w, ...box.children]
      }
    }, 'notified'
  )
}

const Placeholder = VBox({
  vexpand: true,
  hexpand: true,
  vpack: 'center',
  hpack: 'center',
  className: 'placeholder',
  visible: notifs.as(n => n.length === 0),
}, Widget.Icon(icons.notifications.silent), Widget.Label('Your inbox is empty'))

export default Widget.Scrollable({
  vexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  className: 'notification-scrollable',
}, VBox({ className: 'notification-list' }, NotificationList(), Placeholder))
