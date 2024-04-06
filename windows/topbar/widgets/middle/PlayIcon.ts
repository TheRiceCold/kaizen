import { type Props as CircularProgressProps } from 'types/widgets/circularprogress'
import { type MprisPlayer } from 'types/service/mpris'
import icons from 'data/icons'

const mpris = await Service.import('mpris')

export default (player: MprisPlayer) => {
  function progressUpdate (prog: CircularProgressProps) {
    return prog.value = player.position / player.length
  }

  function iconUpdate (self) {
    switch (player.play_back_status) {
      case 'Playing': 
        self.icon = icons.mpris.playing
        break
      case 'Paused': 
        self.icon = icons.mpris.paused 
        break
      default: 
        self.icon = icons.mpris.stopped
        break
    }
  }

  const Icon = Widget.Icon().hook(mpris, iconUpdate)

  return Widget.CircularProgress({
    child: Icon,
    startAt: 0.75,
    className: 'progress',
  }).hook(mpris, progressUpdate).poll(1500, progressUpdate)
}
