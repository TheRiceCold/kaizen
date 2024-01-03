import { Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { Brightness } from '../../../services/main.js'

import { icons } from '../../../constants/main.js'

const BrightnessSlider = () => Widget.Slider({
  draw_value: false,
  hexpand: true,
  binds: [['value', Brightness, 'screen']],
  onChange: ({ value }) => Brightness.screen = value,
})

export default () => Widget.Box({
  children: [
    Widget.Button({
      child: FontIcon(icons.brightness.indicator),
      binds: [['tooltip-text', Brightness, 'screen', v => `Screen Brightness: ${Math.floor(v * 100)}%`]],
    }),
    BrightnessSlider(),
  ],
})
