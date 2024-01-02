import { 
  Utils,
  Widget, 
  Notifications, 
} from '../../imports.js'
import icons from '../../icons.js'
import { FontIcon, Notification } from '../../misc/main.js'

const ClearButton = () => Widget.Button({
  onClicked: () => {
    const list = Array.from(Notifications.notifications)
    for (let i = 0; i < list.length; i++) Utils.timeout(50 * i, () => list[i]?.close())
  },
  binds: [['sensitive', Notifications, 'notifications', n => n.length > 0]],
  child: Widget.Box({
    children: [
      Widget.Label('Clear '),
      FontIcon({
        binds: [['icon', Notifications, 'notifications', n =>
          n.length > 0 ? icons.trash.full : icons.trash.empty]],
      }),
    ]
  }),
})

const Header = () => Widget.Box({
  className: 'header',
  children: [
    Widget.Label({ label: 'Notifications', hexpand: true, xalign: 0 }),
    ClearButton(),
  ],
})

const NotificationList = () => Widget.Box({
  vexpand: true,
  vertical: true,
  connections: [[Notifications, box => {
    box.children = Notifications.notifications.reverse().map(Notification)
    box.visible = Notifications.notifications.length > 0
  }]],
})

const Placeholder = () => Widget.Box({
  class_name: 'placeholder',
  vertical: true,
  vpack: 'center',
  hpack: 'center',
  vexpand: true,
  hexpand: true,
  children: [
    FontIcon(icons.notifications.silent),
    Widget.Label('Your inbox is empty'),
  ],
  binds: [['visible', Notifications, 'notifications', n => n.length === 0]],
})

export default () => Widget.Box({
  className: 'notifications',
  vertical: true,
  children: [
    Header(),
    Widget.Scrollable({
      vexpand: true,
      className: 'notification-scrollable',
      child: Widget.Box({
        className: 'notification-list',
        vertical: true,
        children: [
          NotificationList(),
          Placeholder(),
        ],
      }),
    }),
  ],
})
