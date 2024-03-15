import { type MprisPlayer } from 'types/service/mpris'
import options from 'options'
import icons from 'data/icons'
import { icon } from 'lib/utils'

const mpris = await Service.import('mpris')
const players = mpris.bind('players')

function lengthStr(length: number) {
  const min = Math.floor(length / 60)
  const sec = Math.floor(length % 60)
  const sec0 = sec < 10 ? '0' : ''
  return `${min}:${sec0}${sec}`
}

const isRealPlayer = player => (
  !player.busName.startsWith('org.mpris.MediaPlayer2.firefox') && // Firefox mpris dbus is useless
  !player.busName.startsWith('org.mpris.MediaPlayer2.playerctld') && // Doesn't have cover art
  !player.busName.endsWith('.mpd') // Non-instance mpd bus
)

const Player = (player: MprisPlayer) => {
  const cover = Widget.Box({
    vpack: 'start',
    className: 'cover',
    css: Utils.merge([
      player.bind('cover_path'),
      player.bind('track_cover_url'),
      options.media.coverSize.bind(),
    ], (path, url, size) => `
      min-width: ${size}px;
      min-height: ${size}px;
      background-image: url('${path || url}');
    `),
  })

  const title = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    className: 'title',
    maxWidthChars: 30,
    label: player.bind('track_title'),
  })

  const artist = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 20,
    className: 'artist',
    label: player.bind('track_artists').as(a => a.join(', ')),
  })

  const positionSlider = Widget.Slider({
    drawValue: false,
    className: 'position',
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
    hpack: 'start',
    className: 'position',
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
    hexpand: true,
    hpack: 'end',
    vpack: 'start',
    className: 'icon',
    tooltipText: player.identity || '',
    icon: Utils.merge(
      [ player.bind('entry'), options.media.monochromeIcon.bind() ],
      (e, s) => icon(`${e}${s ? '-symbolic' : ''}`, icons.fallback.audio)
    ),
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
    Widget.Box(
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

export default Widget.Box({
  vertical: true,
  className: 'media vertical',
  children: players.as(p => p.map(player => isRealPlayer(player) ? Player(player) : null)),
})
