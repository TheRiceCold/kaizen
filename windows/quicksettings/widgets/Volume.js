import { Widget, Audio, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { Arrow, Menu } from '../ToggleButton.js'

import icons from '../../../icons.js'
import { getAudioTypeIcon } from '../../../utils.js'

const VolumeIndicator = (type = 'speaker') => Widget.Button({
  onClicked: () => Audio[type].is_muted = !Audio[type].is_muted,
  child: FontIcon({
    connections: [[Audio, icon => {
      if (!Audio[type]) return

      icon.icon = type === 'speaker'
        ? getAudioTypeIcon(Audio[type].icon_name || '')
        : icons.audio.mic.high

      icon.tooltip_text = `Volume ${Math.floor(Audio[type].volume * 100)}%`
    }, `${type}-changed`]],
  }),
})

const VolumeSlider = (type = 'speaker') => Widget.Slider({
  hexpand: true,
  draw_value: false,
  onChange: ({ value }) => Audio[type].volume = value,
  connections: [[Audio, slider => {
    slider.value = Audio[type]?.volume
  }, `${type}-changed`]],
})

export const Volume = () => Widget.Box({
  children: [
    VolumeIndicator('speaker'),
    VolumeSlider('speaker'),
    Widget.Box({ vpack: 'center', child: Arrow('sink-selector') }),
    Widget.Box({
      vpack: 'center',
      child: Arrow('app-mixer'),
      connections: [[Audio, box => box.visible = Audio.apps.length > 0 ]],
    }),
  ],
})

export const Microhone = () => Widget.Box({
  class_name: 'slider horizontal',
  binds: [['visible', Audio, 'recorders', r => r.length > 0]],
  children: [
    VolumeIndicator('microphone'),
    VolumeSlider('microphone'),
  ],
})

const MixerItem = stream => Widget.Box({
  hexpand: true,
  class_name: 'mixer-item horizontal',
  children: [
    FontIcon({
      binds: [['tooltipText', stream, 'name']],
      connections: [[stream, icon => {
        icon.icon = Utils.lookUpIcon(stream.name || '') ? (stream.name || '') : icons.mpris.fallback
      }]],
    }),
    Widget.Box({
      vertical: true,
      children: [
        Widget.Label({
          xalign: 0,
          truncate: 'end',
          binds: [['label', stream, 'description']],
        }),
        Widget.Slider({
          hexpand: true,
          draw_value: false,
          binds: [['value', stream, 'volume']],
          onChange: ({ value }) => stream.volume = value,
        }),
      ],
    }),
    Widget.Label({
      xalign: 1,
      connections: [[stream, l => {
        l.label = `${Math.floor(stream.volume * 100)}%`
      }]],
    }),
  ],
})

const SinkItem = stream => Widget.Button({
  hexpand: true,
  onClicked: () => Audio.speaker = stream,
  child: Widget.Box({
    children: [
      FontIcon({
        icon: getAudioTypeIcon(stream.icon_name || ''),
        tooltip_text: stream.icon_name,
      }),
      Widget.Label((stream.description || '').split(' ').slice(0, 4).join(' ')),
      FontIcon({
        icon: icons.ui.tick,
        hexpand: true,
        hpack: 'end',
        binds: [['visible', Audio, 'speaker', s => s === stream]],
      }),
    ],
  }),
})

const SettingsButton = () => Widget.Button({
  onClicked: () => Utils.execAsync('pavucontrol'),
  hexpand: true,
  child: Widget.Box({
    children: [
      FontIcon(icons.ui.settings),
      Widget.Label('Settings'),
    ],
  }),
})

export const AppMixer = () => Menu({
  name: 'app-mixer',
  icon: FontIcon(icons.audio.mixer),
  title: Widget.Label('App Mixer'),
  content: [
    Widget.Box({ 
      vertical: true, 
      binds: [['children', Audio, 'apps', a => a.map(MixerItem)]] 
    }),
    Widget.Separator(),
    SettingsButton(),
  ],
})

export const SinkSelector = () => Menu({
  name: 'sink-selector',
  icon: FontIcon(icons.audio.type.headset),
  title: Widget.Label('Sink Selector'),
  content: [
    Widget.Box({ vertical: true, binds: [['children', Audio, 'speakers', s => s.map(SinkItem)]] }),
    Widget.Separator(),
    SettingsButton(),
  ],
})
