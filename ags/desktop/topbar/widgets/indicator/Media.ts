import Cava from 'misc/cava'
import IconLabel from './IconLabel'

import options from 'options'
import { sh, getPlayer } from 'lib/utils'

const mpris = await Service.import('mpris')
const {
  visualizer: { width, height, smooth },
  titleLength: { topbar: length },
} = options.player

function getLabel(player) {
  if (player) {
    const artists = player['track-artists'].join(', ')
    const label = `${artists && artists} - ${player['track_title']}`
    return label.substring(0, length.value)
  } else return ''
}

export const playing = Widget.Box().hook(mpris,
  (self: typeof Widget.Box) => {
    const player = getPlayer()
    if (!player) return
    self.hpack = 'center'
    self.children = IconLabel('player', getLabel(player))
  })

export const visualizer = Widget.Box({ hpack: 'center', className: 'visualizer' })
  .hook(mpris, (self: typeof Widget.Box) => {
    if (!getPlayer()) return
    sh('pkill cava')
    const limit = length.value
    const size = Math.round(getLabel(getPlayer()).length * 0.9)
    self.child = Cava({
      smooth, width, height,
      bars: (size < limit ? size : limit) * width,
    })
  })
