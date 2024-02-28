import { type Notification as Notif } from 'types/service/notifications'
import Notification from 'windows/notifications/Notification'

import options from 'options'
import icons from 'data/icons'

const notifications = await Service.import('notifications')
const notifs = notifications.bind('notifications')

const Animated = (n: Notif) => Widget.Revealer({
  child: Notification(n),
  transition: 'slide_down',
  transitionDuration: options.transition.value,
  setup: self => Utils.timeout(options.transition.value, () => {
    if (!self.is_destroyed)
      self.reveal_child = true
  }),
})

const SilentButton = Widget.Button({
  child: Widget.Label('󱏧'),
  onClicked: () => notifications.dnd = !notifications.dnd
})

const ClearButton = Widget.Button({
  child: Widget.Label('󰃢'),
  onClicked: notifications.clear,
  sensitive: notifs.as(n => n.length > 0),
})

const Header = Widget.Box({
  className: 'notifications-header',
  children: [
    Widget.Label({ label: 'Notifications', hexpand: true, xalign: 0 }),
    Widget.Box({
      spacing: options.theme.spacing * 0.75,
      children: [ SilentButton, ClearButton ]
    })
  ],
})

const NotificationList = () => {
  const map: Map<number, ReturnType<typeof Animated>> = new Map
  const box = Widget.Box({
    vertical: true,
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
      n.reveal_child = false
      Utils.timeout(options.transition.value, () => {
        n.destroy()
        map.delete(id)
      })
    }
  }

  return box.hook(notifications, remove, 'closed').hook(notifications, (_, id: number) => {
    if (id !== undefined) {
      if (map.has(id)) remove(null, id)

      const n = notifications.getNotification(id)!

      const w = Animated(n)
      map.set(id, w)
      box.children = [w, ...box.children]
    }
  }, 'notified')
}

const Placeholder = Widget.Box({
  vexpand: true,
  hexpand: true,
  vertical: true,
  vpack: 'center',
  hpack: 'center',
  className: 'placeholder',
  visible: notifs.as(n => n.length === 0),
  children: [
    Widget.Icon(icons.notifications.silent),
    Widget.Label('Your inbox is empty'),
  ],
})

export default Widget.Box({
  vertical: true,
  className: 'notifications',
  css: options.notifications.width.bind().as(w => `min-width: ${w}px`),
  children: [
    Header,
    Widget.Scrollable({
      vexpand: true,
      hscroll: 'never',
      className: 'notification-scrollable',
      child: Widget.Box({
        className: 'notification-list vertical',
        vertical: true,
        children: [ NotificationList(), Placeholder ],
      }),
    }),
  ],
})
