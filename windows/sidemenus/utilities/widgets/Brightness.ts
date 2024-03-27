import icons from 'data/icons'
import brightness from 'service/brightness'

const BrightnessSlider = () => Widget.Slider({
  draw_value: false,
  hexpand: true,
  value: brightness.bind('screen'),
  onChange: ({ value }) => brightness.screen = value,
})

export const Brightness = () => Widget.Box({
  className: 'brightness',
  children: [
    Widget.Button({
      vpack: 'center',
      child: Widget.Icon(icons.brightness.indicator),
      onClicked: () => brightness.screen = 0,
      tooltipText: brightness.bind('screen').as(v => `Screen Brightness: ${Math.floor(v * 100)}%`),
    }),
    BrightnessSlider(),
  ],
})
