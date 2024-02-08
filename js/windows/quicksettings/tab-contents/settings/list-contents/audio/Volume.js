import { services } from '../../../../../../constants/main.js'
import { sorm, iconSubstitute } from './exports.js'

const { Audio } = services

const TypeIndicator = (type = 'sink') => Widget.Button({
  onClicked: () => Utils.execAsync(`pactl set-${type}-mute @DEFAULT_${type.toUpperCase()}@ toggle`),
  child: Widget.Icon().hook(Audio, icon => {
    if (Audio[sorm(type)])
      icon.icon = iconSubstitute(Audio[sorm(type)].icon_name, type)
  }, sorm(type) + '-changed')
})

const VolumeSlider = (type = 'sink') => Widget.Slider({
  hexpand: true,
  draw_value: false,
  onChange: ({ value }) => Audio[sorm(type)].volume = value
}).hook(Audio, slider => {
  if (!Audio[sorm(type)]) return

  slider.sensitive = !Audio[sorm(type)]?.stream.is_muted
  slider.value = Audio[sorm(type)].volume
}, sorm(type) + '-changed')

const PercentLabel = (type = 'sink') => Widget.Label({
  className: 'audio-volume-label',
}).hook(Audio, label => {
  if (Audio[sorm(type)])
    label.label = `${Math.floor(Audio[sorm(type)].volume * 100)}%`
}, sorm(type) + '-changed')

export default (type = 'sink') => Widget.Box({
  className: 'audio-volume-box',
  children: [
    TypeIndicator(type),
    VolumeSlider(type),
    PercentLabel(type),
  ]
})
