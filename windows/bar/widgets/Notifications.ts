import BarButton from '../BarButton'
const notifications = await Service.import('notifications')

export default () => BarButton({
  child: Widget.Box([
    Widget.Label('󱅫'),
    Widget.Label({
      attribute: {
        unreadCount: 0,
        update: self => self.label = `${self.attribute.unreadCount}`,
      },
      setup: self => self.hook(notifications, (self, id) => {
        if (!id || notifications.dnd) return
        if (!notifications.getNotification(id)) return
        self.attribute.unreadCount++
        self.attribute.update(self)
      }, 'notified')
    })
  ])
})
