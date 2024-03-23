import { type Props as LabelProps } from 'types/widgets/label'
import BarButton from '../../BarButton'

const notifications = await Service.import('notifications')

export default () => BarButton({
  child: Widget.Box([
    Widget.Label(' '),
    Widget.Label({
      attribute: {
        unreadCount: 0,
        update: (self: LabelProps) => self.label = `${self.attribute.unreadCount}`,
      }
    }).hook(notifications, (self: LabelProps, id: number) => {
      if (!id || notifications.dnd) return
      if (!notifications.getNotification(id)) return
      self.attribute.unreadCount++
      self.attribute.update(self)
    }, 'notified')
  ])
})
