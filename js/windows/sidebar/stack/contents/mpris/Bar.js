import { Widget, Mpris } from '../../../../../imports.js'
// import { RoundedAngleEnd } from "../roundedCorner/index.js"
import { icons } from '../../../../../constants/main.js'

const MusicContainer = () => Widget.EventBox({
  onPrimaryClick: () => {
    const player = Mpris.getPlayer('spotify') || Mpris.getPlayer()
    if (!player) return
    player.playPause()
  },
  onSecondaryClick: () => {
    const player = Mpris.getPlayer('spotify') || Mpris.getPlayer()
    if (!player) return
    player.next()
  },
  child: Widget.Box({
    className: 'bar-music-container',
    spacing: 5,
    children: [
      Widget.CircularProgress({
        startAt: 0.75,
        className: 'music-progress',
        child: Widget.Icon().hook(Mpris, icon => {
          const player = Mpris.getPlayer('spotify') || Mpris.getPlayer()
          if (!player) return
          let icn = icons.mpris.stopped
          if (player.play_back_status === 'Playing')
            icn = icons.mpris.playing
          else if (player.play_back_status === 'Paused')
            icn = icons.mpris.paused
          icon.icon = icn
        }),
      })
        .hook(Mpris, (prog) => {
          const player = Mpris.getPlayer('spotify') || Mpris.getPlayer()
          if (!player) return
          prog.value = player.position / player.length
        })
        .poll(1000, (prog) => {
          const player = Mpris.getPlayer('spotify') || Mpris.getPlayer()
          if (!player) return
          prog.value = player.position / player.length
        }),
      Widget.Label({ max_width_chars: 35, truncate: 'end' }).hook(Mpris, label => {
        const player = Mpris.getPlayer('spotify') || Mpris.getPlayer()
        if (!player) return
        label.label = player?.track_title + ' - ' + player?.track_artists
      })
    ]
  })
})

const MusicBarContainer = () => Widget.Box({
  hexpand: true,
  children: [
    // RoundedAngleEnd("topleft", {class_name: "angle"}),
    MusicContainer(),
    // RoundedAngleEnd("topright", {class_name: "angle"})
  ],
})

export default () => Widget.Box({
  vpack: 'start',
  vertical: false,
}).pack_start(Widget.Revealer({
  child: MusicBarContainer(),
  transition: 'slide_down',
  transition_duration: 200,
  reveal_child: Mpris.bind('players').transform(players => players.length > 0)
}), false, false, 0)
