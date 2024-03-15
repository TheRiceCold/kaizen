import { type MprisPlayer } from 'types/service/mpris'
import options from 'options'
import icons from 'data/icons'

const mpris = await Service.import('mpris')
const { length } = options.bar.media

export default (player: MprisPlayer) => {
  const progressUpdate = prog => prog.value = player.position / player.length

  const Icon = Widget.Icon().hook(mpris, self => {
    switch (player.play_back_status) {
      case 'Playing': self.icon = icons.mpris.playing; break
      case 'Paused': self.icon = icons.mpris.paused; break
      default: self.icon = icons.mpris.stopped; break
    }
  })

  const Progress = Widget.CircularProgress({
    child: Icon, startAt: 0.75, className: 'progress',
  }).hook(mpris, progressUpdate).poll(1000, progressUpdate)

  const Text = Widget.Label({
    truncate: 'end',
    className: 'text',
    maxWidthChars: length.bind(),
    visible: length.bind().as(l => l > 0),
    label: player.bind('track_title').as(() => `${player.track_artists.join(', ')} - ${player.track_title}`),
  })

  return Widget.Box({ hpack: 'center', children: [Progress, Text] })
}
