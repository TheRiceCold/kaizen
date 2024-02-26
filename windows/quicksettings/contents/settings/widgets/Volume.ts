import { type Stream } from 'types/service/audio'
import { Arrow, Menu } from '../ToggleButton'
import { dependencies, icon, sh } from 'lib/utils'
import icons from 'lib/icons'
const audio = await Service.import('audio')

type Type = 'microphone' | 'speaker'

const VolumeIndicator = (type: Type = 'speaker') => Widget.Button({
  vpack: 'center',
  onClicked: () => audio[type].is_muted = !audio[type].is_muted,
  child: Widget.Icon({
    icon: audio[type].bind('icon_name').as(i => icon(i || '', icons.audio.mic.high)),
    tooltipText: audio[type].bind('volume').as(vol => `Volume: ${Math.floor(vol * 100)}%`),
  }),
})

const VolumeSlider = (type: Type = 'speaker') => Widget.Slider({
  hexpand: true,
  drawValue: false,
  value: audio[type].bind('volume'),
  onChange: ({ value, dragging }) => dragging && (audio[type].volume = value),
})

export const Volume = () => Widget.Box({
  className: 'volume',
  children: [
    VolumeIndicator('speaker'),
    VolumeSlider('speaker'),
    Widget.Box({
      vpack: 'center',
      child: Arrow('sink-selector'),
    }),
    Widget.Box({
      vpack: 'center',
      child: Arrow('app-mixer'),
      visible: audio.bind('apps').as(a => a.length > 0),
    }),
  ],
})

export const Microphone = () => Widget.Box({
  className: 'slider horizontal',
  visible: audio.bind("recorders").as(a => a.length > 0),
  children: [
    VolumeIndicator('microphone'),
    VolumeSlider('microphone'),
  ],
})

const MixerItem = (stream: Stream) => Widget.Box(
  {
    hexpand: true,
    className: 'mixer-item horizontal',
  },
  Widget.Icon({
    tooltip_text: stream.bind('name').as(n => n || ''),
    icon: stream.bind('name').as(n => Utils.lookUpIcon(n || '') ? (n || '') : icons.fallback.audio),
  }),
  Widget.Box(
    { vertical: true },
    Widget.Label({
      xalign: 0,
      truncate: 'end',
      maxWidthChars: 28,
      label: stream.bind('description').as(d => d || ''),
    }),
    Widget.Slider({
      hexpand: true,
      drawValue: false,
      value: stream.bind('volume'),
      on_change: ({ value }) => stream.volume = value,
    }),
  ),
)

const SinkItem = (stream: Stream) => Widget.Button({
  hexpand: true,
  onClicked: () => audio.speaker = stream,
  child: Widget.Box({
    children: [
      Widget.Icon({
        icon: icon(stream.icon_name || '', icons.fallback.audio),
        tooltipText: stream.icon_name || '',
      }),
      Widget.Label((stream.description || '').split(' ').slice(0, 4).join(' ')),
      Widget.Icon({
        hpack: 'end',
        hexpand: true,
        icon: icons.ui.tick,
        visible: audio.speaker.bind('stream').as(s => s === stream.stream),
      }),
    ],
  }),
})

const SettingsButton = () => Widget.Button({
  onClicked: () => {
    if (dependencies('pavucontrol'))
      sh('pavucontrol')
  },
  hexpand: true,
  child: Widget.Box({
    children: [
      Widget.Icon(icons.ui.settings),
      Widget.Label('Settings'),
    ],
  }),
})

export const AppMixer = () => Menu({
  name: 'app-mixer',
  title: 'App Mixer',
  icon: icons.audio.mixer,
  content: [
    Widget.Box({
      vertical: true,
      className: 'vertical mixer-item-box',
      children: audio.bind("apps").as(a => a.map(MixerItem)),
    }),
    Widget.Separator(),
    SettingsButton(),
  ],
})

export const SinkSelector = () => Menu({
  name: 'sink-selector',
  title: 'Sink Selector',
  icon: icons.audio.type.headset,
  content: [
    Widget.Box({
      vertical: true,
      children: audio.bind('speakers').as(a => a.map(SinkItem)),
    }),
    Widget.Separator(),
    SettingsButton(),
  ],
})
