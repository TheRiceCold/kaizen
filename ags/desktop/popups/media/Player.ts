import options from 'options'
import icons from 'data/icons'
import { getPlayer } from 'lib/utils'

const mpris = await Service.import('mpris')
const length = options.player.titleLength.popup

const Title = Widget.Label({
  hpack: 'start',
  truncate: 'end',
  className: 'title',
  maxWidthChars: length.bind(),
}).hook(mpris, self => {
  const player = getPlayer()
  if (!player) return
  self.label = player['track-title']
})

const Artist = Widget.Label({
  hpack: 'start',
  truncate: 'end',
  maxWidthChars: 20,
  className: 'artist',
}).hook(mpris, self => {
  const player = getPlayer()
  if (!player) return
  self.label = player['track-artists'].join(', ')
})

export default Widget.Box({
  hexpand: true,
  vertical: true,
  className: 'player',
}).hook(mpris, self => {
  const player = getPlayer()
  if (!player) return

  const Slider = Widget.Slider({
    drawValue: false,
    onChange({ value }) { player.position = value * player.length },
    setup(self) {
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
    setup(self) {
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

  const playPause = Widget.Button({
    cursor: 'pointer',
    className: 'play-pause',
    onClicked() { player.playPause() },
  }, Widget.Icon().bind(
    'icon', player, 'play-back-status',
    status => icons.mpris[status.toLowerCase()]
  ))

  const prev = Widget.Button({
    cursor: 'pointer',
    onClicked() { player.previous() },
  }, Widget.Icon(icons.mpris.prev))

  const next = Widget.Button({
    cursor: 'pointer',
    onClicked() { player.next() },
  }, Widget.Icon(icons.mpris.next))

  self.children = [
    Title, Artist, Slider,
    Widget.CenterBox({
      className: 'footer horizontal',
      startWidget: positionLabel,
      centerWidget: Widget.Box([ prev, playPause, next ]),
      endWidget: lengthLabel,
    }),
  ]
})
