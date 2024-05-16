import { type LabelProps } from 'types/widgets/label'

import PlayerStatusIcon from 'misc/playerStatusIcon'

import options from 'options'
import icons from 'data/icons'
import { icon } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

const mpris = await Service.import('mpris')
const {
  preferred,
  coverSize,
  monochromeIcon,
} = options.popups.player

export default Widget.Box({
  vexpand: false,
  className: 'player',
}).hook(mpris, self => {
  const player = mpris.getPlayer(preferred.value) || null
  if (!player) return
  const url = player['cover_path'] || player['track_cover_url']

  // TODO: Turnable animation, like spicetify
  // reference: https://github.com/spicetify/spicetify-themes/raw/master/Turntable/screenshots/fad.png
  const cover = Widget.Box({
    vpack: 'start',
    className: 'cover',
    css: `
    min-width: ${coverSize}px;
    min-height: ${coverSize}px;
    background-image: url('${url}');`
  })

  const title = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 30,
    className: 'title',
    label: player['track_title']
  })

  const playerIcon = Widget.Icon({
    hexpand: true,
    hpack: 'end',
    vpack: 'start',
    className: 'icon',
    tooltipText: player.identity || '',
    icon: Utils.merge(
      [ player.bind('entry'), monochromeIcon.bind() ],
      (e: string, s: string) => icon(`${e}${s ? '-symbolic' : ''}`, icons.fallback.audio)
    ),
  })

  const artist = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 20,
    className: 'artist',
    label: player['track_artists'].join(', ')
  })

  const positionSlider = Widget.Slider({
    drawValue: false,
    onChange({ value }) { player.position = value * player.length },
    setup(self) {
      function update() {
        const { length, position } = player
        self.value = length > 0 ? position / length : 0
      }
      self.hook(player, update)
      self.hook(player, update, 'position')
      self.poll(1000, update)
    }
  })

  function lengthStr(length: number) {
    const min = Math.floor(length / 60)
    const sec = Math.floor(length % 60)
    const sec0 = sec < 10 ? '0' : ''
    return `${min}:${sec0}${sec}`
  }

  const positionLabel = Widget.Label({
    hpack: 'start',
    className: 'position',
    setup(self: LabelProps) {
      function update(_: unknown, time?: number) {
        self.label = lengthStr(time || player.position)
      }
      self.hook(player, update, 'position')
      self.poll(1000, update)
    },
  })

  const lengthLabel = Widget.Label({
    hpack: 'end',
    className: 'length',
    label: player.bind('length').as(lengthStr),
    visible: player.bind('length').as((l: number) => l > 0),
  })

  const playPause = Widget.Button({
    className: 'play-pause',
    setup: setupCursorHover,
    child: PlayerStatusIcon(player),
    visible: player.bind('can_play'),
    onClicked() { player.playPause() },
  })

  const prev = Widget.Button({
    setup: setupCursorHover,
    onClicked() { player.previous() },
    visible: player.bind('can_go_prev'),
    child: Widget.Icon(icons.mpris.prev),
  })

  const next = Widget.Button({
    setup: setupCursorHover,
    onClicked() { player.next() },
    visible: player.bind('can_go_next'),
    child: Widget.Icon(icons.mpris.next),
  })

  self.children = [
    cover, Widget.Box({ vertical: true },
      Widget.Box([ title, playerIcon ]),
      artist,
      Widget.Box({ vexpand: true }),
      positionSlider,
      Widget.CenterBox({
        className: 'footer horizontal',
        startWidget: positionLabel,
        centerWidget: Widget.Box([ prev, playPause, next ]),
        endWidget: lengthLabel,
      }),
    )
  ]
})
