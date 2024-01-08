import { Widget, Mpris } from '../../imports.js'

import { AnimatedCircularProgress } from '../../misc/main.js'
import { MarginRevealer } from '../../misc/AdvancedRevealers.js'

import { variables } from '../../constants/main.js'

const PREFERRED_PLAYER = 'plasma-browser-integration'

const isRealPlayer = player => (
  !player.busName.startsWith('org.mpris.MediaPlayer2.firefox') &&
  !player.busName.startsWith('org.mpris.MediaPlayer2.playerctld')
)

export const getPlayer = (name = PREFERRED_PLAYER) =>
  Mpris.getPlayer(name) || Mpris.players[0] || null

function lengthStr(length) {
  const min = Math.floor(length / 60)
  const sec = Math.floor(length % 60)
  const sec0 = sec < 10 ? '0' : ''
  return `${min}:${sec0}${sec}`
}

const DEFAULT_MUSIC_FONT = 'Gabarito, sans-serif'
function getTrackfont(player) {
  const title = player.trackTitle
  const artists = player.trackArtists.join(' ')
  if (artists.includes('TANO*C') || artists.includes('USAO') || artists.includes('Kobaryo')) 
    return 'Chakra Petch'
  if (title.includes('東方')) 
    return 'Crimson Text, serif'
  return DEFAULT_MUSIC_FONT
}

const trimTrackTitle = title => title.replace(/【[^】]*】/, '').trim()

const TrackProgress = props => {
  const _updateProgress = circprog => {
    const player = Mpris.getPlayer()
    if (!player) return
    circprog.css = `font-size: ${Math.max(player.position / player.length * 100, 0)}px;`
  }
  return AnimatedCircularProgress({
    ...props,
    className: 'osd-music-circprog',
    vpack: 'center',
    connections: [ // Update on change/once every 3 seconds
      [Mpris, _updateProgress],
      [3000, _updateProgress]
    ],
  })
}

const TrackTitle = ({ player, ...rest }) => Widget.Label({
  ...rest,
  xalign: 0,
  truncate: 'end',
  label: 'No music playing',
  className: 'osd-music-title',
  connections: [[player, (self) => {
    self.label = player.trackTitle.length > 0 ? trimTrackTitle(player.trackTitle) : 'No media'
    const fontForThisTrack = getTrackfont(player)
    self.css = `font-family: ${fontForThisTrack}, ${DEFAULT_MUSIC_FONT};`
  }, 'notify::track-title']]
})

const TrackArtists = ({ player, ...rest }) => Widget.Label({
  ...rest,
  xalign: 0,
  truncate: 'end',
  className: 'osd-music-artists',
  connections: [[player, self => {
    self.label = player.trackArtists.length > 0 ? player.trackArtists.join(', ') : ''
  }, 'notify::track-artists']]
})

const TrackControls = props => Widget.Revealer({
  revealChild: false,
  transition: 'slide_right',
  transitionDuration: 200,
  child: Widget.Box({
    ...props,
    vpack: 'center',
    className: 'osd-music-controls spacing-h-3',
    children: [
      Widget.Button({
        className: 'osd-music-controlbtn',
        child: Widget.Label({
          label: 'skip_previous',
          className: 'osd-music-controlbtn-txt',
        })
      }),
      Widget.Button({
        className: 'osd-music-controlbtn',
        child: Widget.Label({
          className: 'osd-music-controlbtn-txt',
          label: 'skip_next',
        })
      }),
    ]
  }),
  connections: [[Mpris, self => {
    const player = Mpris.getPlayer()
    if (!player) self.revealChild = false
    else self.revealChild = true
  }, 'notify::play-back-status']]
})

const TrackTime = ({ player, ...rest }) => {
  return Widget.Revealer({
    revealChild: false,
    transition: 'slide_left',
    transitionDuration: 200,
    child: Widget.Box({
      ...rest,
      vpack: 'center',
      className: 'osd-music-pill spacing-h-5',
      children: [
        Widget.Label({
          connections: [[1000, (self) => {
            const player = Mpris.getPlayer()
            if (!player) return
            self.label = lengthStr(player.position)
          }]]
        }),
        Widget.Label({ label: '/' }),
        Widget.Label({
          connections: [[Mpris, (self) => {
            const player = Mpris.getPlayer()
            if (!player) return
            self.label = lengthStr(player.length)
          }]]
        }),
      ],
    }),
    connections: [[Mpris, (self) => {
      if (!player) self.revealChild = false
      else self.revealChild = true
    }]]
  })
}

const PlayState = ({ player }) => {
  const trackCircProg = TrackProgress({ player: player })
  return Widget.Button({
    className: 'osd-music-playstate',
    child: Widget.Overlay({
      child: trackCircProg,
      overlays: [
        Widget.Button({
          className: 'osd-music-playstate-btn',
          onClicked: () => Mpris.getPlayer().playPause(),
          child: Widget.Label({
            justification: 'center',
            hpack: 'fill',
            vpack: 'center',
            connections: [[player, label => {
              label.label = `${player.playBackStatus == 'Playing' ? '' : ''}`
            }, 'notify::play-back-status']],
          }),
        }),
      ],
      passThrough: true,
    })
  })
}

const MusicControlsWidget = player => Widget.Box({
  className: 'osd-music spacing-h-20',
  children: [
    Widget.CoverArt({ player: player, vpack: 'center' }),
    Widget.Box({
      vertical: true,
      className: 'spacing-v-5 osd-music-info',
      children: [
        Widget.Box({
          vertical: true,
          vpack: 'center',
          hexpand: true,
          children: [
            TrackTitle({ player: player }),
            TrackArtists({ player: player }),
          ]
        }),
        Widget.Box({ vexpand: true }),
        Widget.Box({
          className: 'spacing-h-10',
          setup: box => {
            box.pack_start(TrackControls({ player: player }), false, false, 0)
            box.pack_end(PlayState({ player: player }), false, false, 0)
            box.pack_end(TrackTime({ player: player }), false, false, 0)
          }
        })
      ]
    })
  ]
})

export default () => MarginRevealer({
  transition: 'slide_down',
  revealChild: false,
  showClass: 'osd-show',
  hideClass: 'osd-hide',
  child: Widget.Box({
    connections: [[Mpris, box => {
      let foundPlayer = false

      Mpris.players.forEach((player) => {
        if (isRealPlayer(player)) {
          foundPlayer = true
          box._player = player
          box.children = [MusicControlsWidget(player)]
        }
      })

      if (!foundPlayer) {
        box._player = null
        const children = box.get_children()
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          child.destroy()
        }
        return
      }
    }, 'notify::players']],
  }),
  connections: [
    [variables.showMusicControls, revealer => {
      if(variables.showMusicControls.value) 
        revealer._show()
      else 
        revealer._hide()
    }],
  ],
})
