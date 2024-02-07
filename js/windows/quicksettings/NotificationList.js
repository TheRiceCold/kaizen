import { FontIcon, Notification }from '../../misc/main.js'

import { icons, services } from '../../constants/main.js'
import { setupCursorHover } from '../../misc/CursorHover.js'
const { Notifications } = services

const EmptyContent = Widget.Box({
  homogeneous: true,
  children: [ Widget.Box({
    vertical: true,
    vpack: 'center',
    className: 'spacing-v-10',
    children: [
      Widget.Box({
        vertical: true,
        className: 'spacing-v-5',
        children: [
          FontIcon({ icon: icons.notifications.bell, className: 'txt-hugerass' }),
          Widget.Label({ label: 'No notifications', className: 'txt-small' }),
        ]
      }),
    ]
  })]
})

const ListActionButton = (icon, name, action) => Widget.Button({
  className: 'notif-listaction-btn',
  onClicked: action,
  child: Widget.Box({
    className: 'spacing-h-5',
    children: [
      FontIcon({ icon, className: 'txt-norm' }),
      Widget.Label({ className: 'txt-small', label: name })
    ]
  }),
  setup: setupCursorHover,
})
// const silenceButton = ListActionButton('notifications_paused', 'Silence', (self) => {
  // Notifications.dnd = !Notifications.dnd
  // self.toggleClassName('notif-listaction-btn-enabled', Notifications.dnd)
// })

const Title = Widget.Box({
  vpack: 'start',
  className: 'spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Notifications',
      className: 'txt-title-small',
    }),
    ListActionButton('󰎟', 'Clear', () => Notifications.clear())
  ]
})

const ListContent = Widget.Scrollable({
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
          if (box.get_children().length == 0) {
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

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, empty: EmptyContent },
  setup: self => self.hook(Notifications, self => self.shown = (Notifications.notifications.length > 0 ? 'list' : 'empty')),
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'spacing-v-5',
  children: [ Title, Contents ],
})
