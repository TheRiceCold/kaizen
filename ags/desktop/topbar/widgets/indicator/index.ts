import Stack from './Stack'

import options from 'options'
import { getPlayer } from 'lib/utils'

const mpris = await Service.import('mpris')
const stack = Stack

const revealer = Widget.Revealer({
  child: Widget.Box(),
  transition: 'slide_down',
  transitionDuration: options.transition,
}).hook(mpris, self => {
  const player = getPlayer()

  const revealTimeout = () => Utils.timeout(500, () => {
    self.revealChild = !!player
    self.parent.toggleClassName('show-border', !!player)
  })

  if (!player) { revealTimeout(); return }
  if (player['play-back-status'] !== 'Playing')
    stack.shown = 'playing'

  self.child.children = [ stack ]
  revealTimeout()
})

export default Widget.Box({
  vpack: 'start',
  child: revealer,
  cursor: 'pointer',
  className: 'indicator',
})
