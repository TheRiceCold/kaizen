import { Widget, Notifications } from '../../../../../imports.js'
import { FontIcon } from '../../../../../misc/main.js'

import StackContent from '../Content.js'
import { icons } from '../../../../../constants/main.js'
// import NotificationList from './NotificationList.js'

export default [
  'notifications',
  StackContent({
    title: 'Notifications',
    icon: icons.notifications.bell,
    // content: NotificationList(),
    headerChild: Widget.Box({
      spacing: 5,
      children: [
        Widget.Button({
          onClicked: () => Notifications.clear(),
          child: Widget.Box({
            children: [ Widget.Label('Clear '), FontIcon('') ]
          }),
          visible: Notifications.bind('notifications').transform(notifs => notifs.length > 0)
        }),
        //     Widget.Switch().hook(Notifications, sw => {
        //       sw.active =  (sw.active === Notifications.dnd) && !Notifications.dnd
        //     }).on('notify::active', ({ active }) => {
        //       Notifications.dnd = (active === Notifications.dnd) && !active
        //     })
      ]
    })
  })
]
