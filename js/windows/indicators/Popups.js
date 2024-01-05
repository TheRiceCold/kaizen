import { Notifications, Widget } from '../../imports.js'
import { Notification } from '../../misc/main.js'

export default Widget.Box({
  vertical: true,
  className: 'osd-notifs spacing-v-5-revealer',
  attribute: {
    map: new Map(),
    dismiss: (box, id) => {
      if (!box.attribute.map.has(id))
        return
      const notif = box.attribute.map.get(id)
      notif.attribute.count--
      if (notif.attribute.count <= 0) {
        box.attribute.map.delete(id)
        notif.attribute.destroyWithAnims()
      }
    },
    notify: (box, id) => {
      const notif = Notifications.getNotification(id)
      if (Notifications.dnd || !notif)
        return
      const replace = box.attribute.map.get(id)
      if (!replace) {
        const notification = Notification(notif)
        box.attribute.map.set(id, notification)
        notification.attribute.count = 1
        box.pack_start(notification, false, false, 0)
      } else {
        const notification = Notification(notif, true)
        notification.attribute.count = replace.attribute.count + 1
        box.remove(replace)
        replace.destroy()
        box.pack_start(notification, false, false, 0)
        box.attribute.map.set(id, notification)
      }
    },
  },
})
  .hook(Notifications, (box, id) => box.attribute.notify(box, id), 'notified')
  .hook(Notifications, (box, id) => box.attribute.dismiss(box, id), 'dismissed')
  .hook(Notifications, (box, id) => box.attribute.dismiss(box, id, true), 'closed');
