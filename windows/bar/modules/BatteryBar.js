import { Widget, Battery } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import PanelButton from './PanelButton.js'

import options from '../../../options.js'

const Indicator = () => Widget.Stack({
  items: [
    ['false', FontIcon('󱊣')],
    ['true', Widget.Label({ label: ' ' })],
  ],
  binds: [['visible', options.battery.bar.showIcon]],
  connections: [[Battery, stack => {
    stack.shown = `${Battery.charging || Battery.charged}`
  }]],
})

const PercentLabel = () => Widget.Revealer({
  transition: 'slide_right',
  binds: [['reveal-child', options.battery.showPercentage]],
  child: Widget.Label({
    binds: [['label', Battery, 'percent', p => `${p}%`]],
  }),
})

const LevelBar = () => Widget.LevelBar({
  connections: [[options.battery.bar.full, self => {
    const full = options.battery.bar.full.value
    self.vpack = full ? 'fill' : 'center'
    self.hpack = full ? 'fill' : 'center'
  }]],
  binds: [['value', Battery, 'percent', p => p / 100]],
})

const WholeButton = () => Widget.Overlay({
  child: LevelBar(),
  pass_through: true,
  className: 'whole-button',
  overlays: [Widget.Box({
    hpack: 'center',
    children: [
      FontIcon({ icon: ' ', binds: [['visible', Battery, 'charging']] }),
      Widget.Box({ hpack: 'center', vpack: 'center', child: PercentLabel() }),
    ],
  })],
})

export default () => PanelButton({
  className: 'battery-bar',
  onClicked: () => {
    const v = options.battery.showPercentage.value
    options.battery.showPercentage.value = !v
  },
  content: Widget.Box({
    connections: [
      [Battery, w => {
        w.toggleClassName('charging', Battery.charging || Battery.charged)
        w.toggleClassName('medium', Battery.percent < options.battery.medium.value)
        w.toggleClassName('low', Battery.percent < options.battery.low.value)
        w.toggleClassName('half', Battery.percent < 48)
      }],
    ],
    binds: [
      ['visible', Battery, 'available'],
      ['children', options.battery.bar.full, 'value', full => full
        ? [ WholeButton() ] : [ 
          Indicator(), 
          PercentLabel(), 
          LevelBar() 
      ]],
    ],
  }),
})
