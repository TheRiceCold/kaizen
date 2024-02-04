import {  Mpris } from '../../imports.js'

import { AnimatedCircularProgress } from '../../misc/main.js'
import { MarginRevealer } from '../../misc/AdvancedRevealers.js'

import { utils } from '../../constants/main.js'

const { Gio, GLib } = imports.gi

const expandTilde = path =>
  path.startsWith('~') ? GLib.get_home_dir() + path.slice(1) : path

const LIGHTDARK_FILE_LOCATION = `${GLib.get_user_cache_dir()}/ags/user/colormode.txt`
const lightDark = Utils.readFile(expandTilde(LIGHTDARK_FILE_LOCATION)).trim()
const COVER_COLORSCHEME_SUFFIX = '_colorscheme.css'
let lastCoverPath = ''

function fileExists(filePath) {
  let file = Gio.File.new_for_path(filePath)
  return file.query_exists(null)
}

const isRealPlayer = player => (
  !player.busName.startsWith('org.mpris.MediaPlayer2.firefox') &&
  !player.busName.startsWith('org.mpris.MediaPlayer2.playerctld')
)

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

function trimTrackTitle(title) {
  let cleanRegexes = [
    /【[^】]*】/,
    /\[FREE DOWNLOAD\]/,
  ]
  // cleanRegexes.forEach(expr => cleanedTitle.replace(expr, ''))
  return title
}

const TrackProgress = props => {
  const _updateProgress = circprog => {
    const player = Mpris.getPlayer()
    if (!player) return
    circprog.css = `font-size: ${Math.max(player.position / player.length * 100, 0)}px;`
  }
  return AnimatedCircularProgress({
    ...props,
    vpack: 'center',
    className: 'osd-music-circprog',
    extraSetup: self => self.hook(Mpris, _updateProgress).poll(3000, _updateProgress)
  })
}

const TrackTitle = ({ player, ...rest }) => Widget.Label({
  ...rest,
  xalign: 0,
  truncate: 'end',
  label: 'No music playing',
  className: 'osd-music-title',
  setup: self => self.hook(player, self => {
    self.label = player.trackTitle.length > 0 ? trimTrackTitle(player.trackTitle) : 'No media'
    const fontForThisTrack = getTrackfont(player)
    self.css = `font-family: ${fontForThisTrack}, ${DEFAULT_MUSIC_FONT};`
  }, 'notify::trackt-title')
})

const TrackArtists = ({ player, ...rest }) => Widget.Label({
  ...rest,
  xalign: 0,
  truncate: 'end',
  className: 'osd-music-artists',
  setup: self => self.hook(player, self => {
    self.label = player.trackArtists.length > 0 ? player.trackArtists.join(', ') : ''
  }, 'notify::track-artists')
})

const CoverArt = ({ player, ...props }) => Widget.Box({
  ...props,
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
          attribute: {
            'updateCover': self => {
              const player = Mpris.getPlayer()

              // Player closed
              // Note that cover path still remains, so we're checking title
              if (!player || player.trackTitle == '') {
                self.css = 'background-image: none;'
                App.applyCss(`${App.configDir}/style.css`)
                return
              }

              const coverPath = player.coverPath
              const stylePath = `${player.coverPath}${lightDark}${COVER_COLORSCHEME_SUFFIX}`
              if (player.coverPath === lastCoverPath) 
                self.css = `background-image: url('${coverPath}');`
              lastCoverPath = player.coverPath

              // If a colorscheme has already been generated, skip generation
              if (fileExists(stylePath)) {
                self.css = `background-image: url('${coverPath}');`
                App.applyCss(stylePath)
                return
              }

              // Generate colors
              // Utils.execAsync([
              //   'bash', '-c',
              //   `${App.configDir}/scripts/color_generation/generate_colors_material.py --path '${coverPath}' > ${App.configDir}/sass/_musicmaterial.sass ${lightDark}`
              // ]).then(() => {
              //     Utils.exec(`wal -i "${player.coverPath}" -n -t -s -e -q ${lightDark}`)
              //     Utils.exec(`cp ${GLib.get_user_cache_dir()}/wal/colors.sass ${App.configDir}/sass/_musicwal.sass`)
              //     Utils.exec(`sass ${App.configDir}/sass/_music.sass ${stylePath}`);
              //     self.css = `background-image: url('${coverPath}');`
              //     App.applyCss(`${stylePath}`)
              //   }).catch(print)
            },
          },
          className: 'osd-music-cover-art',
          $: [[player, self => self.attribute.updateCover(self), 'notify::cover-path']],
        })
      ]
    })
  ],
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
        onClicked: () => Utils.execAsync('playerctl previous').catch(print),
        child: Widget.Label({
          label: 'skip_previous',
          className: 'osd-music-controlbtn-txt',
        })
      }),
      Widget.Button({
        className: 'osd-music-controlbtn',
        onClicked: () => utils.execBash(
          'playerctl next || playerctl position `bc << "100 * $(playerctl metadata mpris:length) / 1000000 / 100"`'
        ).catch(print),
        child: Widget.Label({
          className: 'osd-music-controlbtn-txt',
          label: 'skip_next',
        })
      }),
    ]
  }),
  setup: self => self.hook(Mpris, self => {
    const player = Mpris.getPlayer()
    if (!player)
      self.revealChild = false
    else
      self.revealChild = true
  }, 'notify::play-back-status'),
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
          setup: self => self.poll(1000, self => {
            const player = Mpris.getPlayer()
            if (!player) return
            self.label = lengthStr(player.position)
          }),
        }),
        Widget.Label({ label: '/' }),
        Widget.Label({
          setup: self => self.hook(Mpris, self => {
            const player = Mpris.getPlayer()
            if (!player) return
            self.label = lengthStr(player.length)
          }),
        }),
      ],
    }),
    setup: self => self.hook(Mpris, self => {
      if (!player) self.revealChild = false
      else self.revealChild = true
    }),
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
          onClicked: () => Utils.execAsync('playerctl play-pause').catch(print),
          child: Widget.Label({
            hpack: 'fill',
            vpack: 'center',
            justification: 'center',
            setup: self => self.hook(player, label => {
              label.label = `${player.playBackStatus === 'Playing' ? 'pause' : 'play_arrow' }`
            }, 'notify::play-back-status'),
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
    CoverArt({ player: player, vpack: 'center' }),
    Widget.Box({
      vertical: true,
      className: 'spacing-v-5 osd-music-info',
      children: [
        Widget.Box({
          hexpand: true,
          vertical: true,
          vpack: 'center',
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
  revealChild: true,
  showClass: 'osd-show',
  hideClass: 'osd-hide',
  transition: 'slide_down',
  child: Widget.Box({
    setup: self => self.hook(Mpris, box => {
      let foundPlayer = false

      Mpris.players.forEach(player => {
        if (isRealPlayer(player)) {
          foundPlayer = true
          box.children = [MusicControlsWidget(player)]
        }
      })

      if (!foundPlayer) {
        const children = box.get_children()
        for (let i = 0; i < children.length; i++) {
          const child = children[i]
          child.destroy()
        }
        return
      }
    }, 'notify::players'),
  }),
  // setup: self => self.hook(variables.showMusicControls, revealer => {
  //   if (variables.showMusicControls.value) 
  //     revealer.attribute.show()
  //   else 
  //     revealer.attribute.hide()
  // }),
})
