import { type MprisPlayer } from 'types/service/mpris'
import icons from 'data/icons'

const mpris = await Service.import('mpris')

export default (player: MprisPlayer) => {
  const progressUpdate = prog => prog.value = player.position / player.length

  const Icon = Widget.Icon().hook(mpris, self => {
    switch (player.play_back_status) {
      case 'Playing': self.icon = icons.mpris.playing; break
      case 'Paused': self.icon = icons.mpris.paused; break
      default: self.icon = icons.mpris.stopped; break
    }
  })

  return Widget.CircularProgress({
    child: Icon,
    className: 'progress',
  }).hook(mpris, progressUpdate).poll(1500, progressUpdate)
}
