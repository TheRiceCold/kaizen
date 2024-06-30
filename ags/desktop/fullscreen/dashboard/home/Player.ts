import options from 'options'
import icons from 'data/icons'

import { getPlayer } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const mpris = await Service.import('mpris')
const { coverSize } = options.dashboard.player

export default Widget.EventBox({
  cursor: 'pointer',
  className: 'player',
  onPrimaryClick() { toggleWidget('player') },
  child: Widget.Box({vertical: true}).hook(mpris, self => {
    const player = getPlayer()
    if (!player) return
    const url = player['cover-path'] || player['track-cover-url']

    const Cover = Widget.Box({
      className: 'cover',
      css: `
        min-width: ${coverSize}px;
        min-height: ${coverSize}px;
        background-size: cover;
        background-image: url('${url}');`
    })

    const Controls = Widget.Box(
      { className: 'controls', hpack: 'center' },
      Widget.Button({
        cursor: 'pointer',
        onClicked() { player.previous() },
        child: Widget.Icon(icons.mpris.prev)
      }),
      Widget.Button({
        cursor: 'pointer',
        onClicked() { player.playPause() },
        child: Widget.Icon().bind(
          'icon', player, 'play-back-status',
          status => icons.mpris[status.toLowerCase()]
        ),
      }),
      Widget.Button({
        cursor: 'pointer',
        onClicked() { player.next() },
        child: Widget.Icon(icons.mpris.next)
      })
    )

    self.children = [ Cover, Controls ]
  })
})
