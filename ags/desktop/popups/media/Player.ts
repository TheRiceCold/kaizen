import options from 'options'
import icons from 'data/icons'

const mpris = await Service.import('mpris')
const { preferred, coverSize, length } = options.player

export default Widget.Box({ vexpand: false, className: 'player' }).hook(mpris, self => {
  const player = mpris.getPlayer(preferred.value) || null
  if (!player) return
  const url = player['cover-path'] || player['track-cover-url']

  // TODO: Turnable animation, like spicetify
  // reference: https://github.com/spicetify/spicetify-themes/raw/master/Turntable/screenshots/fad.png
  const cover = Widget.Box({
    vpack: 'start',
    className: 'cover',
    css: `
    min-width: ${coverSize}px;
    min-height: ${coverSize}px;
    background-image: url('${url}');`
  })

  const title = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    className: 'title',
    label: player['track-title'],
    maxWidthChars: length.bind(),
  })

  const artist = Widget.Label({
    hpack: 'start',
    truncate: 'end',
    maxWidthChars: 20,
    className: 'artist',
    label: player['track-artists'].join(', ')
  })

  const positionSlider = Widget.Slider({
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
    visible: player.bind('length').as((l: number) => l > 0),
  })

  const playPause = Widget.Button({
    cursor: 'pointer',
    className: 'play-pause',
    visible: player.bind('can-play'),
    onClicked() { player.playPause() },
    child: Widget.Icon().bind(
      'icon', player, 'play-back-status',
      status => icons.mpris[status.toLowerCase()]
    ),
  })

  const prev = Widget.Button({
    cursor: 'pointer',
    onClicked() { player.previous() },
    visible: player.bind('can-go-prev'),
    child: Widget.Icon(icons.mpris.prev),
  })

  const next = Widget.Button({
    cursor: 'pointer',
    onClicked() { player.next() },
    visible: player.bind('can-go-next'),
    child: Widget.Icon(icons.mpris.next),
  })

  self.children = [
    cover, Widget.Box(
      { hexpand: true, vertical: true },
      title, artist,
      Widget.Box({ vexpand: true }),
      positionSlider,
      Widget.CenterBox({
        className: 'footer horizontal',
        startWidget: positionLabel,
        centerWidget: Widget.Box([ prev, playPause, next ]),
        endWidget: lengthLabel,
      }),
    )
  ]
})
