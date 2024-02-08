import Toggles from './toggles/main.js'
import { ListStack } from './exports.js'
import { Brightness } from '../../../../services/main.js'
import { icons, options } from '../../../../constants/main.js'

const Calendar = Widget.Box({
  className: 'calendar',
  children: [ Widget.Calendar({ hexpand: true, hpack: 'center' }) ]
})

const BrightnessSlider = Widget.Box({
  children: [
    Widget.Icon(icons.brightness.indicator),
    Widget.Slider({
      hexpand: true,
      drawValue: false, 
      value: Brightness.bind('screen'),
      onChange: ({ value }) => Brightness.screen = value
    })
  ]
})

export default Widget.Box({
  vertical: true,
  className: 'content',
  spacing: options.spacing.value * 2,
  children: [ Toggles, BrightnessSlider, ListStack ]
})
