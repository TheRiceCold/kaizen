import { App, Widget, Notifications } from '../imports.js'

export const NotificationIndicator = (notifCenterName = 'sideright') => {
  const widget = Widget.Revealer({
    transition: 150,
    transition: 'slide_left',
    revealChild: false,
    setup: self => self.hook(Notifications, (self, id) => {
      if (!id || Notifications.dnd) return
      if (!Notifications.getNotification(id)) return
      self.revealChild = true
    }, 'notified')
    .hook(App, (self, currentName, visible) => {
      if (visible && currentName === notifCenterName)
        self.revealChild = false
    }),
    child: Widget.Box({
      children: [
        Wiget.Label({ 
          label: 'notifications', 
          className: 'icon-material txt-norm'
        }),
        Widget.Label({
          className: 'txt-small titlefont',
          properties: [
            ['increment', (self) => self._unreadCount++],
            ['markread', (self) => self._unreadCount = 0],
            ['update', (self) => self.label = `${self._unreadCount}`],
            ['unreadCount', 0],
          ],
          setup: self => self.hook(Notifications, (self, id) => {
            if (!id || Notifications.dnd) return
            if (!Notifications.getNotification(id)) return
            self._increment(self)
            self._update(self)
          }, 'notified').hook(App, (self, currentName, visible) => {
            if (visible && currentName === notifCenterName) {
              self._markread(self)
              self._update(self)
            }
          }),
        })
      ]
    })
  })
  return widget
}

export const StatusIcons = (props = {}) => Widget.Box({
  ...props,
  child: Widget.Box({
    className: 'spacing-h-15',
    children: [
      NotificationIndicator(),
    ]
  })
})
