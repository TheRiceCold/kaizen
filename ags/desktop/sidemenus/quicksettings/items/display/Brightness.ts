import icons from 'data/icons'
import brightness from 'service/brightness'

const BrightnessSlider = Widget.Slider({
  hexpand: true,
  drawValue: false,
  value: brightness.bind('screen'),
  onChange({ value }) { brightness.screen = value },
})

const Percent = Widget.Label({
  label: brightness.bind('screen').as((v: number) => `${Math.floor(v * 100)}%`)
})

export default Widget.Box(
  { className: 'slider-box' },
  Widget.Icon(icons.brightness.indicator),
  BrightnessSlider,
  Percent
)
