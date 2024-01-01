import { Widget } from '../../../imports.js'
import Brightness from '../../../services/brightness.js'
import icons from '../../../icons.js'

const BrightnessSlider = () => Widget.Slider({
  draw_value: false,
  hexpand: true,
  binds: [['value', Brightness, 'screen']],
  onChange: ({ value }) => Brightness.screen = value,
})

export default () => Widget.Box({
  children: [
    Widget.Button({
      child: Widget.Icon(icons.brightness.indicator),
      binds: [['tooltip-text', Brightness, 'screen', v => `Screen Brightness: ${Math.floor(v * 100)}%`]],
    }),
    BrightnessSlider(),
  ],
})
