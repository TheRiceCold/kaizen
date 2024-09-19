import { VBox } from 'widgets'

import { audioIconSub } from 'lib/utils'

type Type = 'microphone' | 'speaker'
const audio = await Service.import('audio')

const { Button, Box, Icon, Label, Slider } = Widget

const Volume = (type: Type = 'speaker') => Box(
  { className: 'slider-box' },

  // Indicator
  Button({
    vpack: 'center',
    onClicked() { audio[type].is_muted = !audio[type].is_muted },
    child: Icon().bind('icon', audio[type], 'icon_name', (name: string) => audioIconSub(name || '', type))
  }),

  Slider({
    hexpand: true,
    drawValue: false,
    onChange({ value, dragging }) {
      if (dragging) {
        audio[type].volume = value
        audio[type].is_muted = false
      }
    }
  }).bind('value', audio[type], 'volume')
    .bind('className', audio[type], 'is_muted', (m: boolean) => m ? 'muted' : ''),

  // Percent
  Label().bind('label', audio[type], 'volume', (v: number) => `${Math.floor(v * 100)}%`)
)

export default VBox([Volume('speaker'), Volume('microphone')])
