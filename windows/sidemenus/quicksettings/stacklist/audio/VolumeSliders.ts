import { sorm, iconSubstitute } from './exports'

const audio = await Service.import('audio')

const TypeIndicator = (type = 'sink') => Widget.Button({
  onClicked: () => Utils.execAsync(`pactl set-${type}-mute @DEFAULT_${type.toUpperCase()}@ toggle`),
  child: Widget.Icon().hook(audio, icon => {
      if (audio[sorm(type)])
        icon.icon = iconSubstitute(audio[sorm(type)].icon_name, type)
    }, sorm(type) + '-changed')
})

const VolumeSlider = (type = 'sink') => Widget.Slider({
  hexpand: true,
  draw_value: false,
  onChange: ({ value }) => audio[sorm(type)].volume = value,
}).hook(audio, slider => {
    if (!audio[sorm(type)])
      return;

    slider.sensitive = !audio[sorm(type)]?.stream.is_muted
    slider.value = audio[sorm(type)].volume
  }, sorm(type) + '-changed')

const PercentLabel = (type = 'sink') => Widget.Label({
  className: 'audio-volume-label',
}).hook(audio, label => {
  if (audio[sorm(type)])
    label.label = `${Math.floor(audio[sorm(type)].volume * 100)}%`
}, sorm(type) + '-changed')

const Volume = (type = 'sink') => Widget.Box({
  className: 'slider-box',
  children: [
    TypeIndicator(type),
    VolumeSlider(type),
    PercentLabel(type)
  ],
})

export default Widget.Box({
  vertical: true,
  children: [
    Volume('sink'),
    Volume('source'),
  ]
})
