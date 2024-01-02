import { Widget, Battery } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import PanelButton from './PanelButton.js'

import icons from '../../../icons.js'
import options from '../../../options.js'

const Indicator = Widget.Stack({
  binds: [['visible', options.battery.bar.showIcon]],
  items: [ ['false', FontIcon('󱊣')], ['true', FontIcon(icons.battery.charging)] ],
  connections: [[ Battery, stack => stack.shown = `${Battery.charging || Battery.charged}` ]],
})

const PercentLabel = () => Widget.Revealer({
  transition: 'slide_right',
  binds: [['reveal-child', options.battery.showPercentage]],
  child: Widget.Label({ binds: [['label', Battery, 'percent', p => `${p}% `]] }),
})

const LevelBar = () => Widget.LevelBar({
  connections: [[options.battery.bar.full, self => {
    const value = options.battery.bar.full.value ? 'fill' : 'center'
    self.vpack = value
    self.hpack = value
  }]],
  binds: [['value', Battery, 'percent', p => p / 100]],
})

const WholeButton = Widget.Overlay({
  child: LevelBar(),
  pass_through: true,
  className: 'whole-button',
  overlays: [
    Widget.Box({
      hpack: 'center',
      children: [
        FontIcon({ icon: icons.battery.charging, binds: [['visible', Battery, 'charging']] }),
        Widget.Box({ hpack: 'center', vpack: 'center', child: PercentLabel() }),
      ],
    })
  ],
})

const Content = Widget.Box({
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
    ['children', options.battery.bar.full, 'value', full => full ? [ WholeButton ] : [ 
      Indicator,
      PercentLabel(), 
      LevelBar()
    ]],
  ],
})

const onClicked = () => {
  const { value } = options.battery.showPercentage
  options.battery.showPercentage.value = !value
}

export default PanelButton({ onClicked, content: Content, className: 'battery-bar' })
