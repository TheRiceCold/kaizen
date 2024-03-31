import Header from '../Header'

export default Widget.Box({
  vertical: true,
  className: 'audio-list',
  children: [
    Header('Sound and Audio', [
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
