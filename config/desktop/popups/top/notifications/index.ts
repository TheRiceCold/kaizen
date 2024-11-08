import { type BoxProps } from 'types/widgets/box'
import { VBox } from 'widgets'
import Animated from './Animated'

const notifications = await Service.import('notifications')

export default () => {
  const map: Map<number, ReturnType<typeof Animated>> = new Map()
  function remove(_: unknown, id: number) {
    map.get(id)?.dismiss()
    map.delete(id)
  }

  return VBox({ hpack: 'end' })
    .hook(
      notifications,
      (self: BoxProps, id: number) => {
        if (id !== undefined) {
          if (map.has(id)) remove(null, id)

          if (notifications.dnd) return

          const w = Animated(id)
          map.set(id, w)
          self.children = [w, ...self.children]
        }
      },
      'notified',
    )
    .hook(notifications, remove, 'dismissed')
    .hook(notifications, remove, 'closed')
}
