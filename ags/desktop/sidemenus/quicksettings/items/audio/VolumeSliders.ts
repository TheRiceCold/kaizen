import { audioIconSub } from 'lib/utils'

type Type = 'microphone' | 'speaker'
const audio = await Service.import('audio')

const Indicator = (type: Type = 'speaker') => Widget.Button({
  vpack: 'center',
  onClicked() { audio[type].is_muted = !audio[type].is_muted },
}, Widget.Icon()
  .bind('icon', audio[type], 'icon_name', (name: string) => audioIconSub(name || '', type)))

const Slider = (type: Type = 'speaker') => Widget.Slider({
  hexpand: true, drawValue: false,
  onChange({ value, dragging }) {
    if (dragging) {
      audio[type].volume = value
      audio[type].is_muted = false
    }
  },
  value: audio[type].bind('volume'),
  className: audio[type].bind('is_muted').as((m: boolean) => m ? 'muted' : ''),
})

const Percent = (type: Type = 'speaker') => Widget.Label()
  .bind('label', audio[type], 'volume', (v: number) => `${Math.floor(v * 100)}%`)

const Volume = (type: Type = 'speaker') => Widget.Box(
  { className: 'slider-box' },
  Indicator(type),
  Slider(type),
  Percent(type)
)

export default Widget.Box({ vertical: true }, Volume('speaker'), Volume('microphone'))
