import { Notification }from '../../../../../../misc/main.js'
import { services } from '../../../../../../constants/main.js'
const { Notifications } = services

export default Widget.Scrollable({
  hexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box({
    vexpand: true,
    children: [
      Widget.Box({
        vertical: true,
        vpack: 'start',
        className: 'spacing-v-5-revealer',
        setup: self => self.hook(Notifications, (box, id) => {
          if (box.get_children().length === 0) {
            Notifications.notifications.forEach(n => {
              box.pack_end(Notification({
                notification: n,
                isPopup: false,
              }), false, false, 0)
            })
            box.show_all()
            return
          }
          const notification = Notifications.getNotification(id)
          const newNotif = Notification({ notification, isPopup: false })
          if (newNotif) {
            box.pack_end(newNotif, false, false, 0)
            box.show_all()
          }
        }, 'notified').hook(Notifications, (box, id) => {
          if (!id) return
          for (const ch of box.children)
            if (ch._id === id)
              ch.attribute.destroyWithAnims()
        }, 'closed'),
      })
    ],
  }),
  setup: self => {
    const vScrollbar = self.get_vscrollbar()
    vScrollbar.get_style_context().add_class('sidebar-scrollbar')
  }
})
