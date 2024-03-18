import options from 'options'

import Stack from './Stack'
import PlayIcon from './PlayIcon'

const mpris = await Service.import('mpris')
const { preferred, action } = options.media
const getPlayer = () => mpris.getPlayer(preferred.value) || mpris.players[0] || null

export default () => {
  const player = getPlayer()
  const stack = Stack(player)

  return Widget.EventBox({
    vpack: 'start',
    className: 'media',
    onPrimaryClick: player.playPause,
    onSecondaryClick: action.bind(),
    onScrollUp: () => stack.shown = 'player',
    onScrollDown: () => stack.shown = 'visualizer',
    child: Widget.Box([ PlayIcon(player), stack ]),
    tooltipText: player.bind('name').as(name => `Playing on ${name}`)
  })
}
