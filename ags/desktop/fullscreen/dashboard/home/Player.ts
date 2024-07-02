import options from 'options'
import icons from 'data/icons'

import { getPlayer } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const mpris = await Service.import('mpris')
const { coverSize } = options.dashboard.player

const Cover = Widget.Box({
  className: 'cover',
  attribute: { update(self) {
    const player = getPlayer()
    if (!player) return
    const url = player['cover-path'] || player['track-cover-url']
    self.setCss(`
      background-image: url('${url}');
      min-width: ${coverSize.value}px;
      min-height: ${coverSize.value}px;
    `)
  }}
})
  .hook(mpris, self => self.attribute.update(self))
  .hook(coverSize, self => self.attribute.update(self))

const Controls = Widget.Box(
  { className: 'controls', hpack: 'center' },
  Widget.Button({ label: '', cursor: 'pointer' }).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return
    self.onClicked = player.shuffle
    self.toggleClassName('active', player['shuffle-status'])
  }),
  Widget.Button({
    cursor: 'pointer',
    child: Widget.Icon(icons.mpris.prev)
  }).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return
    self.onClicked = player.previous
  }),
  Widget.Button({ cursor: 'pointer', child: Widget.Icon() }).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return
    const status = player['play-back-status'].toLowerCase()
    self.child.icon = icons.mpris[status]
    self.onClicked = player.playPause
  }),
  Widget.Button({
    cursor: 'pointer',
    child: Widget.Icon(icons.mpris.next)
  }).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return
    self.onClicked = player.next
  }),
  Widget.Button({ cursor: 'pointer' }).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return
    const status = player['loop-status']
    const isTrack = status === 'Track'
    const isPlaylist = status === 'Playlist'

    self.onClicked = player.loop
    self.label = isTrack ? '󰑘' : isPlaylist ? '󰕇' : '󰑗'
    self.toggleClassName('active', isTrack || isPlaylist)
  }),
)

export default Widget.EventBox({
  cursor: 'pointer',
  className: 'player',
  child: Widget.Box(
    { vertical: true },
    Cover, Controls
  ).hook(mpris, self => {
    const player = getPlayer()
    self.visible = player
  }),
  onPrimaryClick() { toggleWidget('player') },
})
