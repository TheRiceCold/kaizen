import { Widget, Mpris, Utils } from '../../../imports.js'
import { HoverRevealer } from '../../../misc/main.js'
import * as mpris from '../../../misc/mpris.js'
import options from '../../../options.js'

export const getPlayer = (name = options.mpris.preferred.value) =>
  Mpris.getPlayer(name) || Mpris.players[0] || null

const Indicator = ({ player, direction = 'right' }) => HoverRevealer({
  direction,
  className: `media panel-button ${player.name}`,
  onPrimaryClick: () => player.playPause(),
  onScrollUp: () => player.next(),
  onScrollDown: () => player.previous(),
  onSecondaryClick: () => player.playPause(),
  indicator: mpris.PlayerIcon(player),
  child: Widget.Label({
    vexpand: true,
    truncate: 'end',
    max_width_chars: 40,
    connections: [[player, label => {
      label.label = `${player.track_artists.join(', ')} - ${player.track_title}`
    }]],
  }),
  connections: [[player, revealer => {
    if (revealer._current === player.track_title) return

    revealer._current = player.track_title
    revealer.reveal_child = true
    Utils.timeout(3000, () => revealer.reveal_child = false)
  }]],
})

export default () => {
  let current = null
  const player = getPlayer()

  const update = box => {
    box.visible = !!player

    if (!player) {
      current = null
      return
    }

    if (current === player) return

    current = player
    box.children = [Indicator({ player, direction: 'right' })]
  }

  return Widget.Box({
    connections: [
      [options.mpris.preferred, update],
      [Mpris, update, 'notify::players'],
    ],
  })
}
