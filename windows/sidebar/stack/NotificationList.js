import { Widget, Notifications } from '../../imports.js'
import { setupCursorHover } from '../../misc/CursorHover.js'
import { Notification, FontIcon } from '../../misc/main.js'

const { PolicyType } = imports.gi.Gtk
const NotificationList = Widget.Box({
  vertical: true,
  vpack: 'start',
  className: 'spacing-v-5-revealer',
  connections: [
    [Notifications, (box, id) => {
      if (box.children.length == 0) {
        Notifications.notifications.forEach(n => {
          box.pack_end(Notification({ notifObject: n, isPopup: false }), false, false, 0)
        })
        box.show_all()
      }
      else if (id) {
        const notif = Notifications.getNotification(id)
        const NewNotif = Notification({ notifObject: notif, isPopup: false })

        if (NewNotif) {
          box.pack_end(NewNotif, false, false, 0)
          box.show_all()
        }
      }
    }, 'notified'],

    [Notifications, (box, id) => {
      if (!id) return
      for (const ch of box.children)
        if (ch._id === id) 
          ch._destroyWithAnims()
    }, 'closed'],
    [Notifications, box => box.visible = Notifications.notifications.length > 0],
  ],
})

export default (props) => {
  const listTitle = Widget.Revealer({
    revealChild: false,
    connections: [[Notifications, revealer => {
      revealer.revealChild = (Notifications.notifications.length > 0)
    }]],
    child: Widget.Box({
      vpack: 'start',
      className: 'sidebar-group-invisible txt',
      children: [
        Widget.Label({
          xalign: 0,
          hexpand: true,
          label: 'Notifications',
          className: 'txt-title-small',
        }),
        Widget.Button({
          className: 'notif-closeall-btn',
          onClicked: () => Notifications.clear(),
          child: Widget.Box({
            className: 'spacing-h-5',
            children: [
              FontIcon(''),
              Widget.Label({ label: 'Clear' })
            ]
          }),
          setup: btn => setupCursorHover(btn),
        })
      ]
    })
  })

  const listContents = Widget.Scrollable({
    hexpand: true,
    hscroll: 'never',
    vscroll: 'automatic',
    child: Widget.Box({
      vexpand: true,
      children: [NotificationList],
    })
  })

  listContents.set_policy(PolicyType.NEVER, PolicyType.AUTOMATIC)
  const vScrollbar = listContents.get_vscrollbar()
  vScrollbar.get_style_context().add_class('sidebar-scrollbar')

  return Widget.Box({
    ...props,
    vertical: true,
    children: [ listTitle, listContents ],
    className: 'sidebar-group-invisible spacing-v-5',
  })
}
