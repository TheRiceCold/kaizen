import { Widget, Notifications } from '../../imports.js'
import { Notification } from '../../misc/main.js'

export default Widget.Box({
  vertical: true,
  className: 'osd-notifs spacing-v-5-revealer',
  properties: [
    ['map', new Map()],

    ['dismiss', (box, id, force = false) => {
      if (!id || !box._map.has(id) || box._map.get(id)._hovered && !force)
        return

      const notif = box._map.get(id)
      notif.revealChild = false
      notif._destroyWithAnims()
    }],

    ['notify', (box, id) => {
      // console.log('new notiffy', id, Notifications.getNotification(id))
      if (!id || Notifications.dnd) return;
      if (!Notifications.getNotification(id)) return;

      box._map.delete(id);

      const notif = Notifications.getNotification(id);
      const newNotif = Notification({
          notifObject: notif,
          isPopup: true,
      });
      box._map.set(id, newNotif);
      box.pack_end(box._map.get(id), false, false, 0);
      box.show_all();
    }],
  ],
  setup: self => self
    .hook(Notifications, (box, id) => box._notify(box, id), 'notified')
    .hook(Notifications, (box, id) => box._dismiss(box, id), 'dismissed')
    .hook(Notifications, (box, id) => box._dismiss(box, id, true), 'closed')
  ,
})
