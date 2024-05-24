import Cava from 'misc/cava'
import PlayerStatusIcon from 'misc/playerStatusIcon'

import options from 'options'
import { sh } from 'lib/utils'

import { getPlayer } from 'lib/utils'

const mpris = await Service.import('mpris')
const { length, visualizer: {width, height} } = options.bar.media

function getLabel(player) {
  if (player) {
    const artists = player['track-artists'].join(', ')
    return `${artists && artists+' - '} ${player['track-title']}`
  } else return ''
}

export const playing = Widget.Box([
  Widget.CircularProgress({
    startAt: 0.75,
    className: 'progress',
  }).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return

    self.child = PlayerStatusIcon(player)
    self.poll(1000, () => self.value = player.position / player.length)
  }),
  Widget.Label({
    className: 'media-title',
    maxWidthChars: length.bind(),
  }).hook(mpris, self => {
    const player = getPlayer()
    if (player) self.label = getLabel(player)
  })
])

/* HACK:
 * I don't really need the eventbox widget but,
 * the box widget forces this child show up first
 * no matter how much I enforces it not to by using shown, setup, or hook
*/
export const visualizer = Widget.EventBox({
  hpack: 'center',
  className: 'visualizer',
}).hook(mpris, self => {
  sh('pkill cava')
  const limit = length.value
  const size = getLabel(getPlayer()).length
  self.child = Cava({
    width, height,
    bars: (size < limit ? size : limit) * width,
  })
})
