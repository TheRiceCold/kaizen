import options from 'options'
import Notification from './Notification'

const { timeout } = Utils
const { transition } = options
const notifications = await Service.import('notifications')

export default (id: number) => {
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

  Utils.idle(() => {
    outer.revealChild = true
    timeout(transition.value, () => inner.revealChild = true)
  })

  return Object.assign(box, {
    dismiss() {
      inner.revealChild = false
      timeout(transition.value, () => {
        outer.revealChild = false
        timeout(transition.value, () => box.destroy())
      })
    },
  })
}

