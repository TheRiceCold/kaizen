import { type SliderProps } from 'types/widgets/slider'
import { type LabelProps } from 'types/widgets/label'
import { type BoxProps } from 'types/widgets/box'

import { ButtonIcon, VBox } from 'widgets'

import icons from 'data/icons'

const mpris = await Service.import('mpris')
const getPlayer = () => mpris.getPlayer('spotify') || null

const { Box, CenterBox, Label, Slider } = Widget
const MAX_TITLE_LENGTH = 36
const MAX_ARTIST_LENGTH = 20

function playerLength(length: number) {
  const min = Math.floor(length / 60)
  const sec = Math.floor(length % 60)
  const sec0 = sec < 10 ? '0' : ''
  return `${min}:${sec0}${sec}`
}

export default VBox(
  { hexpand: true, className: 'player' }
).hook(mpris, (self: BoxProps) => {
  const player = getPlayer()
  if (!player) return

  self.children = [
    Label({ // Title
      hpack: 'start',
      truncate: 'end',
      className: 'title',
      maxWidthChars: MAX_TITLE_LENGTH
    }).hook(mpris, (self: LabelProps) => {
      const player = getPlayer()
      if (!player) return
      self.label = player['track-title']
    }),

    Label({ // Artist
      hpack: 'start',
      truncate: 'end',
      className: 'artist',
      maxWidthChars: MAX_ARTIST_LENGTH,
    }).hook(mpris, (self: LabelProps) => {
      const player = getPlayer()
      if (!player) return
      self.label = player['track-artists'].join(', ')
    }),

    Slider({
      drawValue: false,
      onChange({ value }) { player.position = value * player.length },
      setup(self: SliderProps) {
        function update() {
          const { length, position } = player
          self.value = length > 0 ? position / length : 0
        }
        self.hook(player, update)
        self.hook(player, update, 'position')
        self.poll(1000, update)
      }
    }),

    CenterBox({ className: 'footer horizontal' },
      Label({ // Start: Position Label
        hpack: 'start',
        className: 'position',
        setup(self: LabelProps) {
          function update(_: unknown, time?: number) {
            self.label = playerLength(time || player.position)
          }
          self.hook(player, update, 'position')
          self.poll(1000, update)
        },
      }),

      Box([ // Center: Controls
        // Previous Icon
        ButtonIcon(icons.mpris.prev, player.previous),
        // Play Button
        ButtonIcon(player.bind('play-back-status').as((status: string) => icons.mpris[status.toLowerCase()]), player.playPause),
        // Next Button
        ButtonIcon(icons.mpris.next, player.next),
      ]),

      // End: Length Label
      Label({ hpack: 'end', className: 'length' })
        .bind('label', player, 'length', playerLength)
    )
  ]
})
