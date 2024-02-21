import { type MprisPlayer } from 'types/service/mpris'
import icons from 'lib/icons'
import type Gtk from 'gi://Gtk?version=3.0'
import options from 'options'
import { icon } from 'lib/utils'

const mpris = await Service.import('mpris')
const players = mpris.bind('players')
const { media } = options.quicksettings

function lengthStr(length: number) {
  const min = Math.floor(length / 60)
  const sec = Math.floor(length % 60)
  const sec0 = sec < 10 ? '0' : ''
  return `${min}:${sec0}${sec}`
}

const Player = (player: MprisPlayer) => {
  const cover = Widget.Box({
    vpack: 'start',
    className: 'cover',
    css: Utils.merge([player.bind('cover_path'), media.coverSize.bind()], (path, size) => `
      min-width: ${size}px;
      min-height: ${size}px;
      background-image: url('${path}');
    `),
  })

  const title = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    className: 'title',
    max_width_chars: 20,
    label: player.bind('track_title'),
  })

  const artist = Widget.Label({
    className: 'artist',
    maxWidthChars: 20,
    truncate: 'end',
    hpack: 'start',
    label: player.bind('track_artists').as(a => a.join(', ')),
  })

  const positionSlider = Widget.Slider({
    className: 'position',
    drawValue: false,
    onChange: ({ value }) => player.position = value * player.length,
    setup: self => {
      const update = () => {
        const { length, position } = player
        self.visible = length > 0
        self.value = length > 0 ? position / length : 0
      }
      self.hook(player, update)
      self.hook(player, update, 'position')
      self.poll(1000, update)
    },
  })

  const positionLabel = Widget.Label({
      className: 'position',
      hpack: 'start',
      setup: self => {
        const update = (_: unknown, time?: number) => {
          self.label = lengthStr(time || player.position)
          self.visible = player.length > 0
        }
        self.hook(player, update, 'position')
        self.poll(1000, update)
      },
  })

  const lengthLabel = Widget.Label({
    hpack: 'end',
    className: 'length',
    label: player.bind('length').as(lengthStr),
    visible: player.bind('length').as(l => l > 0),
  })

  const playericon = Widget.Icon({
    hpack: 'end',
    vpack: 'start',
    hexpand: true,
    className: 'icon',
    tooltip_text: player.identity || '',
    icon: Utils.merge([player.bind('entry'), media.monochromeIcon.bind()], (e, s) => {
      const name = `${e}${s ? '-symbolic' : ''}`
      return icon(name, icons.fallback.audio)
    }),
  })

  const playPause = Widget.Button({
    className: 'play-pause',
    onClicked: () => player.playPause(),
    visible: player.bind('can_play'),
    child: Widget.Icon({
      icon: player.bind('play_back_status').as(s => {
        switch (s) {
          case 'Playing': return icons.mpris.playing
          case 'Paused':
          case 'Stopped': return icons.mpris.stopped
        }
      }),
    }),
  })

  const prev = Widget.Button({
    onClicked: () => player.previous(),
    visible: player.bind('can_go_prev'),
    child: Widget.Icon(icons.mpris.prev),
  })

  const next = Widget.Button({
    onClicked: () => player.next(),
    visible: player.bind('can_go_next'),
    child: Widget.Icon(icons.mpris.next),
  })

  return Widget.Box(
    { className: 'player', vexpand: false },
    cover,
    Widget.Box<Gtk.Widget>(
      { vertical: true },
      Widget.Box([ title, playericon ]),
      artist,
      Widget.Box({ vexpand: true }),
      positionSlider,
      Widget.CenterBox({
        className: 'footer horizontal',
        startWidget: positionLabel,
        centerWidget: Widget.Box([ prev, playPause, next ]),
        endWidget: lengthLabel,
      }),
    ),
  )
}

export const Media = () => Widget.Box({
  vertical: true,
  className: 'media vertical',
  children: players.as(p => p.map(Player)),
})
