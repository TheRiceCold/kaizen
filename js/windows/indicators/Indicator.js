import { Widget, Audio } from '../../imports.js'
import { Brightness, Indicator } from '../../services/main.js'
import { MarginRevealer } from '../../misc/AdvancedRevealers.js'

const OsdValue = (name, labelConnections, progressConnections, props = {}) => Widget.Box({
  ...props,
  hexpand: true,
  vertical: true,
  className: 'osd-bg osd-value',
  children: [
    Widget.Box({
      vexpand: true,
      children: [
        Widget.Label({
          xalign: 0,
          yalign: 0,
          hexpand: true,
          label: `${name}`,
          className: 'osd-label',
        }),
        Widget.Label({
          label: '100',
          hexpand: false,
          className: 'osd-value-txt',
          connections: labelConnections,
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

export default () => MarginRevealer({
  transition: 'slide_down',
  showClass: 'osd-show',
  hideClass: 'osd-hide',
  connections: [
    [Indicator, (revealer, value) => {
      if (value > -1) revealer._show()
      else revealer._hide()
    }, 'popup'],
  ],
  child: Widget.Box({
    hpack: 'center',
    vertical: false,
    className: 'spacing-h--10',
    children: [brightnessIndicator, volumeIndicator]
  })
})
