const { Gio, GLib } = imports.gi
import { App, Utils, Widget, Variable, Mpris } from '../../imports.js'
import { AnimatedCircularProgress } from '../../misc/main.js'

const showMusicControls = Variable(false, {})

const expandTilde = path => 
  path.startsWith('~') ? GLib.get_home_dir() + path.slice(1) : path

const LIGHTDARK_FILE_LOCATION = '~/.cache/ags/user/colormode.txt'
const lightDark = Utils.readFile(expandTilde(LIGHTDARK_FILE_LOCATION)).trim()
const COVER_COLORSCHEME_SUFFIX = '_colorscheme.css'
const PREFERRED_PLAYER = 'plasma-browser-integration'
var lastCoverPath = ''

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

const fileExists = filePath => 
  Gio.File.new_for_path(filePath).file.query_exists(null)

const DEFAULT_MUSIC_FONT = 'Gabarito, sans-serif'
function getTrackfont(player) {
  const title = player.trackTitle
  const artists = player.trackArtists.join(' ')
  if (artists.includes('TANO*C') || artists.includes('USAO') || artists.includes('Kobaryo')) return 'Chakra Petch' // Rigid square replacement
  if (title.includes('東方')) return 'Crimson Text, serif' // Serif for Touhou stuff
  return DEFAULT_MUSIC_FONT
}

const TrackProgress = ({ player, ...rest }) => {
  const _updateProgress = (circprog) => {
      const player = Mpris.getPlayer()
      if (!player) return
      // Set circular progress (see definition of AnimatedCircProg for explanation)
      circprog.css = `font-size: ${Math.max(player.position / player.length * 100, 0)}px;`
  }
  return AnimatedCircularProgress({
      ...rest,
      className: 'osd-music-circprog',
      vpack: 'center',
      connections: [ // Update on change/once every 3 seconds
          [Mpris, _updateProgress],
          [3000, _updateProgress]
      ],
  })
}

const TrackTitle = ({ player, ...rest }) => Label({
  ...rest,
  label: 'No music playing',
  xalign: 0,
  truncate: 'end',
  // wrap: true,
  className: 'osd-music-title',
  connections: [[player, (self) => {
      // Player name
      self.label = player.trackTitle.length > 0 ? player.trackTitle : 'No media'
      // Font based on track/artist
      const fontForThisTrack = getTrackfont(player)
      self.css = `font-family: ${fontForThisTrack}, ${DEFAULT_MUSIC_FONT}`
  }, 'notify::track-title']]
})

const TrackArtists = ({ player, ...rest }) => Label({
  ...rest,
  xalign: 0,
  className: 'osd-music-artists',
  truncate: 'end',
  connections: [[player, (self) => {
      self.label = player.trackArtists.length > 0 ? player.trackArtists.join(', ') : ''
  }, 'notify::track-artists']]
})

const CoverArt = ({ player, ...rest }) => Widget.Box({
  ...rest,
  className: 'osd-music-cover',
  children: [
    Widget.Overlay({
      child: Widget.Box({ // Fallback
        homogeneous: true,
        className: 'osd-music-cover-fallback',
        children: [Widget.Label({
          label: 'music_note',
          className: 'icon-material txt-hugeass',
        })]
      }),
      overlays: [ // Real
        Widget.Box({
          properties: [['updateCover', (self) => {
            const player = Mpris.getPlayer()

              // Player closed
              // Note that cover path still remains, so we're checking title
            if (!player || player.trackTitle == "") {
              self.css = `background-image: none;`
              App.applyCss(`${App.configDir}/style.css`)
              return
            }

            const coverPath = player.coverPath
            const stylePath = `${player.coverPath}${lightDark}${COVER_COLORSCHEME_SUFFIX}`
            if (player.coverPath == lastCoverPath) { // Since 'notify::cover-path' emits on cover download complete
              self.css = `background-image: url('${coverPath}');`
            }
            lastCoverPath = player.coverPath

            // If a colorscheme has already been generated, skip generation
            if (fileExists(stylePath)) {
              self.css = `background-image: url('${coverPath}');`
              App.applyCss(stylePath)
              return
            }

              // Generate colors
              Utils.execAsync(['bash', '-c',
                `${App.configDir}/scripts/color_generation/generate_colors_material.py --path '${coverPath}' > ${App.configDir}/sass/_musicmaterial.sass ${lightDark}`
              ]).then(() => {
                Utils.exec(`wal -i "${player.coverPath}" -n -t -s -e -q ${lightDark}`)
                Utils.exec(`bash -c "cp ~/.cache/wal/colors.sass ${App.configDir}/sass/_musicwal.sass"`)
                Utils.exec(`sassc ${App.configDir}/sass/_music.sass ${stylePath}`)
                self.css = `background-image: url('${coverPath}');`
                App.applyCss(`${stylePath}`)
              }).catch(print)
            }
          ]],
          className: 'osd-music-cover-art',
          connections: [[ player, self => self._updateCover(self), 'notify::cover-path' ]],
        })
      ]
    })
  ],
})

const TrackControls = ({ player, ...rest }) => Widget.Revealer({
  revealChild: false,
  transition: 'slide_right',
  transitionDuration: 200,
  child: Widget.Box({
    ...rest,
    vpack: 'center',
    className: 'osd-music-controls spacing-h-3',
    children: [
      Button({
        className: 'osd-music-controlbtn',
        child: Label({
          className: 'icon-material osd-music-controlbtn-txt',
          label: 'skip_previous',
        })
      }),
      Button({
        className: 'osd-music-controlbtn',
        child: Label({
          className: 'icon-material osd-music-controlbtn-txt',
          label: 'skip_next',
        })
      }),
    ],
  }),
  connections: [[Mpris, (self) => {
    self.revealChild = !Mpris.getPlayer()
  }, 'notify::play-back-status']]
})

const TrackTime = ({ player, ...rest }) => Widget.Revealer({
  revealChild: false,
  transition: 'slide_left',
  transitionDuration: 200,
  child: Widget.Box({
    ...rest,
    vpack: 'center',
    className: 'osd-music-pill spacing-h-5',
    children: [
      Label({
        connections: [[1000, self => {
          if (!Mpris.getPlayer()) return;
          self.label = lengthStr(player.position);
        }]]
      }),
      Label({ label: '/' }),
      Label({
        connections: [[Mpris, self => {
          if (!Mpris.getPlayer()) return
          self.label = lengthStr(player.length)
        }]]
      }),
    ],
  }),
  connections: [[Mpris, (self) => {
    self.revealChild = !player;
  }]]
})

const PlayState = ({ player }) => {
  const trackCircProg = TrackProgress({ player: player })
  return Widget.Button({
    className: 'osd-music-playstate',
    child: Widget.Overlay({
      child: trackCircProg,
      overlays: [
        Widget.Button({
          className: 'osd-music-playstate-btn',
          onClicked: () => { Mpris.getPlayer().playPause() },
          child: Widget.Label({
            justification: 'center',
            hpack: 'fill',
            vpack: 'center',
            connections: [[player, label => {
              label.label = `${player.playBackStatus == 'Playing' ? 'pause' : 'play_arrow'}`
            }, 'notify::play-back-status']],
          }),
        }),
      ],
      passThrough: true,
    })
  })
}

const MusicControlsWidget = (player) => Widget.Box({
  className: 'osd-music spacing-h-20',
  children: [
    CoverArt({ player: player, vpack: 'center' }),
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

export default () => Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: 170,
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
        box.get_children().forEach(ch => ch.destroy())
        return
      }
    }, 'notify::players']],
  }),
  connections: [
    [showMusicControls, (revealer) => {
      revealer.revealChild = showMusicControls.value
    }],
  ],
})
