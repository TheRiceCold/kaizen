import { Brightness } from '../../../../services/main.js'
import { icons, services, utils } from '../../../../constants/main.js'

const { Audio } = services

const Row = (toggles = [], menus = []) => Widget.Box({
  vertical: true,
  children: [
    Widget.Box({ className: 'row', children: toggles }),
    ...menus
  ]
})

const VolumeIndicator = (type = 'speaker') => Widget.Button({
  onClicked: () => Audio[type].is_muted = !Audio[type].is_muted,
  child: Widget.Icon().hook(Audio[type], icon => {
    icon.icon = type === 'speaker' ? utils.getAudioTypeIcon() : icons.audio.mic.high
    icon.tooltipText = `Volume ${Math.floor(Audio[type].volume * 100)}%`
  })
})

const VolumeSlider = (type = 'speaker') => Widget.Slider({
  hexpand: true,
  drawValue: false,
  onChange: ({ value }) => Audio[type].volume = value,
  setup: self => self.hook(Audio[type], () => {
    self.value = Audio[type].volume || 0
  })
})

const Volume = Widget.Box({
  children: [
    VolumeIndicator('speaker'),
    VolumeSlider('speaker'),
    Widget.Box({
      vpack: 'center',
    })
  ]
})

const SinkSelector = () => {
  const name = 'sink-selector'
  const opened = Variable('')

  const Item = stream => Widget.Button({
    hexpand: true,
    onClicked: () => Audio.speaker = stream,
    child: Widget.Box({
      children: [
        Widget.Icon({
          icon: utils.getAudioTypeIcon(stream.icon_name || ''),
          tooltipText: stream.icon_name
        }),
        Widget.Label((stream.description || '').split(' ').slice(0, 4).join(' ')),
        Widget.Icon({
          hpack: 'end',
          hexpand: true,
          icon: icons.ui.tick,
          visible: Audio.speaker.bind('stream').transform(s => s === stream.stream)
        })
      ]
    })
  })

  return Widget.Revealer({
    transition: 'slide_down',
    revealChild: opened.bind().transform(v => v === name),
    child: Widget.Box({
      classNames: [ 'menu', name ],
      vertical: true,
      children: [
        Widget.Box({
          className: '',
          children: [
            Widget.Icon(icons.audio.type.headset),
            Widget.Label('Sink Selector')
          ]
        }),
        Widget.Separator(),
        Widget.Box({
          vertical: true,
          children: Audio.bind('speakers').transform(a => a.map(Item))
        }),
        Widget.Separator()
      ]
    })
  })
}

const Microphone = Widget.Box({
  className: 'slider',
  visible: Audio.bind('recorders').transform(a => a.length > 0),
  children: [
    VolumeIndicator('microphone'),
    VolumeSlider('microphone'),
  ]
})

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
    Row(
      [Volume],
      [SinkSelector()]
    ),
    Microphone,
    BrightnessSlider,
  ]
})
