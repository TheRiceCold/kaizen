import { type MprisPlayer } from 'types/service/mpris'
import { type Props as StackProps } from 'types/widgets/stack'

import cava from 'misc/cava'
import options from 'options'

const mpris = await Service.import('mpris')
const { width, height } = options.bar.media.visualizer

const item = (name: string) => Widget.Box({ hpack: 'center', className: name })
const playerLabel = (label: string) => Widget.Label({
  label, className: 'text',
  maxWidthChars: options.bar.media.length.bind().as((n: number) => n > 0 ? n : -1),
})

export default (player: MprisPlayer) => {
  const setup = (self: StackProps) => {
    self.hook(mpris, () => {
      if (!player.entry) return
      if (player.play_back_status === 'Paused')
        self.shown = 'player'

      const label = `${player.track_artists.join(', ')} - ${player.track_title}`
      const bars = Math.round(label.length * 0.75) * width
      self.children.player.child = playerLabel(label)
      self.children.visualizer.child = cava({ bars, width, height })
    })
  }

  return Widget.Stack({
    setup,
    className: 'stack',
    transition: 'slide_up_down',
    children: { player: item('player'), visualizer: item('visualizer') },
  })
}
