import { Widget, Notifications } from '../../../../imports.js'
import { Notification } from '../../../../misc/main.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'

const ListActionButton = (icon, name, action) => Widget.Button({
  onClicked: action,
  className: 'notif-listaction-btn',
  child: Widget.Box({
    className: 'spacing-h-5',
    children: [
      Widget.Label({ label: icon, className: 'txt-norm' }),
      Widget.Label({ className: 'txt-small', label: name })
    ]
  }),
  setup: setupCursorHover,
})

const notificationList = Widget.Box({
  vertical: true,
  vpack: 'start',
  className: 'spacing-v-5-revealer',
  connections: [
    [Notifications, (box, id) => {
      if (box.get_children().length == 0) { // On init there's no notif, or 1st notif
        Notifications.notifications.forEach(n => {
          box.pack_end(Notification({ notification: n, isPopup: false }), false, false, 0)
        })
        box.show_all()
        return
      }

      const notif = Notifications.getNotification(id)
      const NewNotif = Notification({ notification: notif, isPopup: false })
      if (NewNotif) {
        box.pack_end(NewNotif, false, false, 0)
        box.show_all()
      }
    }, 'notified'],
    [Notifications, (box, id) => {
      if (!id) return
      for (const ch of box.children)
        if (ch._id === id) ch._destroyWithAnims()
    }, 'closed'],
  ],
})

const Title = Widget.Box({
  vpack: 'start',
  className: 'sidebar-group-invisible txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Notifications',
      className: 'txt-title-small margin-left-10',
    }),
    ListActionButton('󰂛', 'Silence', self => {
      Notifications.dnd = !Notifications.dnd
      self.toggleClassName('notif-listaction-btn-enabled', Notifications.dnd)
    }),
    ListActionButton('󰎟', 'Clear', () => {
      notificationList.get_children().forEach(ch => ch.destroy())
      Notifications.clear()
    })
  ]
})

const notifEmptyContent = Widget.Box({
  homogeneous: true,
  children: [
    Widget.Box({
      vertical: true,
      vpack: 'center',
      className: 'txt spacing-v-10',
      children: [
        Widget.Box({
          vertical: true,
          className: 'spacing-v-5',
          children: [
            Widget.Label('󰂚', 'txt-badonkers'),
            Widget.Label({ label: 'No notifications', className: 'txt-small' }),
          ]
        }),
      ]
    })
  ]
})

const notifList = Widget.Scrollable({
  hexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box({ vexpand: true, children: [notificationList] }),
  setup: self => {
    const vScrollbar = self.get_vscrollbar()
    vScrollbar.get_style_context().add_class('sidebar-scrollbar')
  }
})


const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  items: [['empty', notifEmptyContent], ['list', notifList]],
  setup: self => self.hook(
    Notifications,
    self => self.shown = (Notifications.notifications.length > 0 ? 'list' : 'empty')
  ),
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  children: [ Title, Contents ],
  className: 'sidebar-group spacing-v-5',
}) 
