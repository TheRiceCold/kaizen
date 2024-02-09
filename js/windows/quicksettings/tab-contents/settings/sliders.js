import { Brightness } from '../../../../services/main.js'
import { icons } from '../../../../constants/main.js'

const BrightnessSlider = Widget.Box({
  children: [
    Widget.Icon(icons.brightness.indicator),
    Widget.Slider({
      hexpand: true,
      drawValue: false, 
      value: Brightness.bind('screen_value'),
      onChange: ({ value }) => Brightness.screen_value = value
    })
  ]
})
export default Widget.Box({
  vertical: true,
  className: 'sliders',
  children: [
    BrightnessSlider,
  ]
})
