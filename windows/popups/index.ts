import Notification from './Notification'
import options from 'options'

const notifications = await Service.import('notifications')
const { transition } = options
const { position, width } = options.notifications
const { timeout, idle } = Utils

function Animated(id: number) {
  const n = notifications.getNotification(id)!
  const widget = Notification(n)

  const inner = Widget.Revealer({
    child: widget,
    transition: 'slide_down',
    css: 'border: 1px solid magenta;',
    transitionDuration: transition.value,
  })

  const outer = Widget.Revealer({
    child: inner,
    transition: 'slide_down',
    css: 'border: 1px solid yellow;',
    transitionDuration: transition.value,
  })

  const box = Widget.Box({ hpack: 'end', child: outer })

  idle(() => {
    outer.reveal_child = true
    timeout(transition.value, () => inner.reveal_child = true)
  })

  return Object.assign(box, {
    dismiss() {
      inner.reveal_child = false
      timeout(transition.value, () => {
        outer.reveal_child = false
        timeout(transition.value, () => box.destroy())
      })
    },
  })
}

function PopupList() {
  const map: Map<number, ReturnType<typeof Animated>> = new Map
  function remove(_: unknown, id: number) {
    map.get(id)?.dismiss()
    map.delete(id)
  }

  return Widget.Box({
    hpack: 'end',
    vertical: true,
    css: width.bind().as(w => `min-width: ${w}px;`),
  }).hook(notifications, (self, id: number) => {
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

export default Widget.Window({
  name: `popups`,
  className: 'popups',
  anchor: position.bind(),
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ PopupList() ]
  }),
})
