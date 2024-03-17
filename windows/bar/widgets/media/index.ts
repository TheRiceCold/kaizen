import options from 'options'

import Stack from './Stack'
import PlayIcon from './PlayIcon'

const mpris = await Service.import('mpris')
const { preferred, action } = options.media
const getPlayer = () => mpris.getPlayer(preferred.value) || mpris.players[0] || null

export default () => {
  let player = getPlayer()
  const stack = Stack(player)
  const { length } = options.bar.media

  const Label = Widget.Label({
    className: 'text',
    maxWidthChars: length.bind(),
    visible: length.bind().as(l => l > 0),
    label: player.bind('track_title').as(() => `${player.track_artists.join(', ')} - ${player.track_title}`),
  })

  const setup = self => {
    player = getPlayer()
    function update() {
      if (!player.entry) return
      stack.children.player.child = Label
    }
    self.hook(preferred, update)
    self.hook(mpris, update, 'notify::players')
  }

  return Widget.EventBox({
    setup,
    vpack: 'start',
    className: 'media',
    onPrimaryClick: player.playPause,
    onSecondaryClick: action.bind(),
    onScrollUp: () => stack.shown = 'player',
    onScrollDown: () => stack.shown = 'cava',
    child: Widget.Box([ PlayIcon(player), stack ]),
  })
}
