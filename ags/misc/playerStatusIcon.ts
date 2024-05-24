import { type MprisPlayer } from 'types/service/mpris'
import icons from 'data/icons'

const { playing, paused, stopped } = icons.mpris

export default (player: MprisPlayer) => Widget.Icon({
  icon: player.bind('play-back-status').as((s: string) => {
    switch (s) {
      case 'Playing': return playing
      case 'Paused': return paused
      default: return stopped
    }
  })
})
