import { ButtonIcon, VBox } from 'widgets'

import options from 'options'
import icons from 'data/icons'
import { getPlayer } from 'lib/utils'

const mpris = await Service.import('mpris')
const length = options.player.titleLength.popup

const Title = Widget.Label({
  hpack: 'start',
  truncate: 'end',
  className: 'title',
}).hook(mpris, (self: typeof Widget.Label) => {
  const player = getPlayer()
  if (!player) return
  self.label = player['track-title']
}).bind('maxWidgetChars', length)

const Artist = Widget.Label({
  hpack: 'start',
  truncate: 'end',
  maxWidthChars: 20,
  className: 'artist',
}).hook(mpris, (self: typeof Widget.Label) => {
  const player = getPlayer()
  if (!player) return
  self.label = player['track-artists'].join(', ')
})

export default VBox({ hexpand: true, className: 'player' })
  .hook(mpris, (self: typeof Widget.Box) => {
    const player = getPlayer()
    if (!player) return

    const Slider = Widget.Slider({
      drawValue: false,
      onChange({ value }) { player.position = value * player.length },
      setup(self: typeof Widget.Slider) {
        function update() {
          const { length, position } = player
          self.value = length > 0 ? position / length : 0
        }
        self.hook(player, update)
        self.hook(player, update, 'position')
        self.poll(1000, update)
      }
    })

    function lengthStr(length: number) {
      const min = Math.floor(length / 60)
      const sec = Math.floor(length % 60)
      const sec0 = sec < 10 ? '0' : ''
      return `${min}:${sec0}${sec}`
    }

    const positionLabel = Widget.Label({
      hpack: 'start',
      className: 'position',
      setup(self: typeof Widget.Label) {
        function update(_: unknown, time?: number) {
          self.label = lengthStr(time || player.position)
        }
        self.hook(player, update, 'position')
        self.poll(1000, update)
      },
    })

    const lengthLabel = Widget.Label({
      hpack: 'end',
      className: 'length',
      label: player.bind('length').as(lengthStr),
    })

    const playPause = ButtonIcon(player.bind('play-back-status')
      .as((status: string) => icons.mpris[status.toLowerCase()]), player.playPause)

    const prev = ButtonIcon(icons.mpris.prev, player.previous)
    const next = ButtonIcon(icons.mpris.next, player.next)

    self.children = [
      Title, Artist, Slider,
      Widget.CenterBox({
        className: 'footer horizontal',
        startWidget: positionLabel,
        centerWidget: Widget.Box([prev, playPause, next]),
        endWidget: lengthLabel,
      }),
    ]
  })
