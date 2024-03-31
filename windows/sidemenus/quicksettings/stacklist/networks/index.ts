import Header from '../Header'

export default Widget.Box({
  vertical: true,
  className: 'network-list',
  children: [
    Header('Network', { }, [
      // {
      //   child: Widget.Icon({ icon: notificationIcon }),
      //   onClicked: () => notifications.dnd = !notifications.dnd
      // },
      // {
      //   onClicked: notifications.clear,
      //   child: Widget.Icon(icons.ui.broom),
      //   sensitive: notifs.as(n => n.length > 0),
      // }
    ]),
    // Content
  ],
})
