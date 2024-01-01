import { Widget, Audio } from '../../imports.js'
import Brightness from '../../services/brightness.js'
import Indicator from '../../services/indicator.js'

const OsdValue = (name, labelConnections, progressConnections, props = {}) => 
  Widget.Box({
  ...props,
  vertical: true,
  className: 'osd-bg osd-value',
  hexpand: true,
  children: [
    Widget.Box({
      vexpand: true,
      children: [
        Widget.Label({
          label: `${name}`,
          className: 'osd-label',
          xalign: 0, yalign: 0, hexpand: true,
        }),
        Widget.Label({
          label: '100',
          connections: labelConnections,
          hexpand: false, className: 'osd-value-txt',
        }),
      ]
    }),
    Widget.ProgressBar({
      hexpand: true,
      vertical: false,
      className: 'osd-progress',
      connections: progressConnections,
    })
  ],
})

const brightnessIndicator = OsdValue('Brightness',
  [[Brightness, self => {
    self.label = `${Math.round(Brightness.screen_value * 100)}`
  }, 'notify::screen-value']],
  [[Brightness, (progress) => {
    const updateValue = Brightness.screen_value
    progress.value = updateValue
  }, 'notify::screen-value']],
)

const volumeIndicator = OsdValue('Volume',
  [[Audio, (label) => {
    label.label = `${Math.round(Audio.speaker?.volume * 100)}`
  }]],
  [[Audio, (progress) => {
    const updateValue = Audio.speaker?.volume
    if (!isNaN(updateValue)) progress.value = updateValue
  }]],
)

export default () => Widget.Revealer({
  transition: 'slide_down',
  connections: [
    [Indicator, (revealer, value) => {
      revealer.revealChild = (value > -1)
    }, 'popup'],
  ],
  child: Widget.Box({
    hpack: 'center',
    vertical: false,
    children: [ brightnessIndicator, volumeIndicator ]
  })
})
