import { type ButtonProps } from 'types/widgets/button'

import { ButtonIcon, ButtonLabel, VBox } from 'widgets'

import options from 'options'
import icons from 'data/icons'
import { getPlayer } from 'lib/utils'
import { toggleWidget } from 'lib/globals'

const audio = await Service.import('audio')
const mpris = await Service.import('mpris')

const { coverSize } = options.dashboard.player
const { Box, Button, EventBox, Icon ,Label, Revealer, Slider, Overlay } = Widget
const showVolume = Variable(false)

export default EventBox({
  cursor: 'pointer',
  className: 'player',
  onPrimaryClick() { toggleWidget('player') },
  child: Box([
    VBox([
      // Cover
      Overlay({
        className: 'cover',
        overlay: Button({
          hpack: 'end', vpack: 'start',
          onClicked() { showVolume.value = !showVolume.value }
        }, Icon(icons.audio.type.speaker)),
      }, Box({
        attribute: { update(self: typeof Box) {
          const player = getPlayer()
          if (!player) return
          const url = player['cover-path'] || player['track-cover-url']
          self.setCss(`
            background-image: url('${url}');
            min-width: ${coverSize.value}px;
            min-height: ${coverSize.value}px;
          `)
        }}
      })
        .hook(mpris, (self: typeof Box) => self.attribute.update(self))
        .hook(coverSize, (self: typeof Box) => self.attribute.update(self))),

      // Controls
      Box(
        { className: 'controls', hpack: 'center' },
        ButtonLabel('').hook(mpris, (self: ButtonProps) => {
          const player = getPlayer()
          if (!player) return
          self.onClicked = player.shuffle
          self.toggleClassName('active', player['shuffle-status'])
        }),
        ButtonIcon(icons.mpris.prev).hook(mpris, (self: ButtonProps) => {
          const player = getPlayer()
          if (!player) return
          self.onClicked = player.previous
        }),
        Button({cursor: 'pointer'}, Icon()).hook(mpris, (self: ButtonProps) => {
          const player = getPlayer()
          if (!player) return
          const status = player['play-back-status'].toLowerCase()
          self.child.icon = icons.mpris[status]
          self.onClicked = player.playPause
        }),
        ButtonIcon(icons.mpris.next).hook(mpris, (self: ButtonProps) => {
          const player = getPlayer()
          if (!player) return
          self.onClicked = player.next
        }),
        Button({ cursor: 'pointer' }).hook(mpris, (self: ButtonProps) => {
          const player = getPlayer()
          if (!player) return
          const status = player['loop-status']
          const isTrack = status === 'Track'
          const isPlaylist = status === 'Playlist'

          self.onClicked = player.loop
          self.label = isTrack ? '󰑘' : isPlaylist ? '󰕇' : '󰑗'
          self.toggleClassName('active', isTrack || isPlaylist)
        }),
      )
    ]),

    // Volume Slider
    Revealer({
      vpack: 'center',
      className: 'volume',
      transition: 'slide_right',
      transitionDuration: options.transition,
      child: audio.bind('apps').as(apps => {
        const spotify = apps.find(app => app.description.toLowerCase() === 'spotify')

        if (!spotify) return Box()

        return VBox([
          Slider({
            vertical: true,
            inverted: true,
            drawValue: false,
            value: spotify.bind('volume'),
            onChange({ value }) { spotify.volume = value },
          }),
          Label().bind('label', spotify, 'volume', (vol: number) => Math.floor(vol * 100)+'%')
        ])
      })
    }).bind('revealChild', showVolume)
  ]).hook(mpris, (self: typeof EventBox) => self.visible = getPlayer())
})
