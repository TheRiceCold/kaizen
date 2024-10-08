import { VBox } from 'widgets'
import Animated from './Animated'

import options from 'options'

const notifications = await Service.import('notifications')

export default () => {
  const map: Map<number, ReturnType<typeof Animated>> = new Map
  function remove(_: unknown, id: number) {
    map.get(id)?.dismiss()
    map.delete(id)
  }

  return VBox({
    hpack: 'end',
    css: options.notifications.width.bind().as((w: number) => `min-width: ${w}px;`),
  }).hook(notifications, (self: typeof Widget.Box, id: number) => {
    if (id !== undefined) {
      if (map.has(id))
        remove(null, id)

      if (notifications.dnd)
        return

      const w = Animated(id)
      map.set(id, w)
      self.children = [w, ...self.children]
    }
  }, 'notified')
    .hook(notifications, remove, 'dismissed')
    .hook(notifications, remove, 'closed')
}
