import options from 'options'
import { Notification } from 'widgets'

const { timeout } = Utils
const { Box, Revealer } = Widget
const { transition } = options
const notifications = await Service.import('notifications')

export default (id: number) => {
  const n = notifications.getNotification(id)!
  const widget = Notification(n)
  const transitionRevealer = {
    transition: 'slide_down',
    transitionDuration: transition.value,
  }

  const inner = Revealer({ ...transitionRevealer }, widget)
  const outer = Revealer({ ...transitionRevealer }, inner)
  const box = Box({ hpack: 'end' }, outer)

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

