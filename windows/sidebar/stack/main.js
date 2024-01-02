import { Widget } from '../../../imports.js'
import { StackState } from '../../../services/main.js'
import StackButtons from './StackButtons.js'

import icons from '../../../icons.js'

const state = new StackState('notifications')

const Header = Widget.Box({
  hpack: 'center',
  homogeneous: true,
  className: 'sidebar-togglesbox spacing-h-10',
  children: StackButtons(state, [
    {
      title: 'notifications',
      tooltip_text: 'Notifications',
      icon: icons.notifications.bell,
    },
    {
      title: 'wifi',
      icon: icons.notifications.bell,
      tooltip_text: 'Wi-Fi | Right-click to configure',
    },
    {
      title: 'bluetooth',
      icon: icons.bluetooth.enabled,
      tooltip_text: 'Bluetooth | Right-click to configure',
    },
    {
      title: 'chatgpt',
      tooltip_text: 'ChatGPT',
      icon: { img: icons.ai.chatgpt },
    },
    {
      title: 'theme',
      icon: icons.dialog.Color,
      tooltip_text: 'Theme Settings',
    },
    {
      icon: '',
      title: 'idle',
      tooltip_text: 'Keep system awake',
    },
  ])
})

const StackContent = content => Widget.Scrollable({
  vexpand: true,
  child: content,
  hscroll: 'never',
  className: 'qs-page',
})

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  visible_child_name: state.bind(),
  items: [
    ['notifications', 
      // QuickSettingsPage(Menu({
      //   title: 'Notifications',
      //   icon: icons.notifications.chat,
      //   content: NotificationList(),
      //   headerChild: Widget.Box({
      //     spacing: 5,
      //     children: [
      //       Widget.Button({
      //         onClicked: () => Notifications.clear(),
      //         child: Widget.Box({
      //           children: [
      //             Widget.Label("Clear "),
      //             Widget.Icon(icons.trash.empty)
      //           ]
      //         }),
      //         visible: Notifications.bind("notifications").transform(notifs => notifs.length > 0)
      //       }),
      //       Widget.Switch().hook(Notifications, sw => {
      //         if (sw.active === Notifications.dnd) sw.active = !Notifications.dnd
      //       }).on("notify::active", ({ active }) => {
      //         if (active === Notifications.dnd) Notifications.dnd = !active
      //       })
      //     ]
      //   })
      // }))
    ],
  ]
})

export default () => {
  // state.items = stack.items.map(item => item[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true,
      children: [ 
        Header
      ]
    })
  })
}
