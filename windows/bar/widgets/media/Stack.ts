import { type MprisPlayer } from 'types/service/mpris'
import cava from 'misc/cava'
import options from 'options'

const mpris = await Service.import('mpris')
const { bars, width, height } = options.bar.media.cava

export default (player: MprisPlayer) => Widget.Stack({
  className: 'stack',
  transition: 'slide_up_down',
  children: {
    player: Widget.Box({ hpack: 'center' }),
    cava: Widget.Box({
      hpack: 'center',
      className: 'cava-container',
      child: cava({ bars: bars * width, width, height }),
    })
  },
}).hook(mpris, self => {
  if (player.play_back_status === 'Paused')
    self.shown = 'player'
})
