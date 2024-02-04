import { services, icons } from '../../../../constants/main.js'
const { Audio } = services

/** @param {string} type */
const sorm = type => type === 'sink' ? 'speaker' : 'microphone'
/** @param {string} type */
const sorms = type => type === 'sink' ? 'speakers' : 'microphones'
/** @param {string | null} item
 *  @param {string} type */
const iconSubstitute = (item, type) => {
  const microphoneSubstitutes = {
    'audio-headset-analog-usb': 'audio-headset-symbolic',
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-input-microphone-symbolic',
    'audio-card-analog-pci': 'audio-input-microphone-symbolic',
    'audio-card-analog': 'audio-input-microphone-symbolic',
    'camera-web-analog-usb': 'camera-web-symbolic'
  }
  const substitues = {
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-speakers-symbolic',
    'audio-card-analog-pci': 'audio-speakers-symbolic',
    'audio-card-analog': 'audio-speakers-symbolic',
    'audio-headset-analog-usb': 'audio-headset-symbolic'
  }

  if (type === 'sink')
    return substitues[item] || item

  return microphoneSubstitutes[item] || item
}

/** @param {import('types/service/audio').Stream} stream */
const streamIconSubstiture = stream => {
  const subs = {
    'spotify': 'spotify',
    'Firefox': 'firefox',
  }
  return subs[stream.name] || stream.icon_name
}

/** @param {string} type */
const TypeIndicator = (type = 'sink') => Widget.Button({
  onClicked: () => Utils.execAsync(`pactl set-${type}-mute @DEFAULT_${type.toUpperCase()}@ toggle`),
  child: Widget.Label().hook(Audio, label => {
    if (Audio[sorm(type)])
      label.label = iconSubstitute(Audio[sorm(type)].icon_name, type)
  }, sorm(type) + '-changed')
})

/** @param {string} type */
const PercentLabel = (type = 'sink') => Widget.Label({
  className: 'audio-volume-label',
}).hook(Audio, label => {
  if (Audio[sorm(type)])
    label.label = `${Math.floor(Audio[sorm(type)].volume * 100)}%`
}, sorm(type) + '-changed')

/** @param {string} type */
const VolumeSlider = (type = 'sink') => Widget.Slider({
  hexpand: true,
  draw_value: false,
  // @ts-ignore
  onChange: ({value}) => Audio[sorm(type)].volume = value,
})
  .hook(Audio, slider => {
    if (!Audio[sorm(type)])
      return

    // @ts-ignore
    slider.sensitive = !Audio[sorm(type)]?.stream.is_muted
    // @ts-ignore
    slider.value = Audio[sorm(type)].volume
  }, sorm(type) + '-changed')

/** @param {string} type */
export const Volume = (type = 'sink') => Widget.Box({
  className: 'audio-volume-box',
  children: [
    TypeIndicator(type),
    VolumeSlider(type),
    PercentLabel(type)
  ],
})

/** @param {import('types/service/audio').Stream} stream */
const MixerItem = stream => Widget.EventBox({
  onPrimaryClick: () => stream.is_muted = !stream.is_muted,
  onScrollUp: () => stream.volume += 0.03,
  onScrollDown: () => stream.volume -= 0.03,
  child: Widget.Box({
    hexpand: true,
    className: 'mixer-item',
    children: [
      Widget.Label({
        label: stream.bind('icon_name').transform(() => streamIconSubstiture(stream)),
        tooltipText: stream.bind('name').transform(name => name || '')
      }),
      Widget.Box({
        vertical: true,
        vpack: 'center',
        children: [
          Widget.Box({
            children: [
              Widget.Label({
                xalign: 0,
                hexpand: true,
                truncate: 'end',
                className: 'mixer-item-title',
                label: stream.bind('description').transform(desc => desc || ''),
              }),
              Widget.Label({
                xalign: 0,
                className: 'mixer-item-volume',
                label: stream.bind('volume').transform(volume => `${Math.floor(volume * 100)}%`)
              }),
            ]
          }),
          Widget.Slider({
            hexpand: true,
            draw_value: false,
            value: stream.bind('volume'),
            className: 'mixer-item-slider',
            onChange: ({ value }) => stream.volume = value,
          }),
        ],
      }),
    ],
  })
})

/**
 * @param {string} type
 * @returns {function(import('types/service/audio').Stream): import('types/widgets/button').default}
 */
const SinkItem = (type) => stream => Widget.Button({
  onClicked: () => Audio[sorm(type)] = stream,
  child: Widget.Box({
    spacing: 5,
    children: [
      Widget.Label({
        label: iconSubstitute(stream.icon_name, type),
        tooltipText: stream.icon_name,
      }),
      Widget.Label(stream.description?.split(' ').slice(0, 4).join(' ')),
      Widget.Label({
        hpack: 'end',
        hexpand: true,
        label: icons.tick,
      }).hook(Audio, icon => {
        icon.visible = Audio[sorm(type)] === stream
      }),
    ],
  }),
})

/** @param {number} tab */
const SettingsButton = (tab = 0) => Widget.Button({
  onClicked: () => services.Hyprland.sendMessage('dispatch exec pavucontrol -t ' + tab),
  child: Widget.Label(icons.settings),
})

export const AppMixer = () => Widget.Box({
  // title: 'App Mixer',
  // icon: icons.audio.mixer,
  child: Widget.Box({
    className: 'app-mixer',
    vertical: true,
    children: [
      Widget.Box({vertical: true}).hook(Audio, box => {
        box.children = Audio.apps.map(MixerItem)
      }, 'notify::apps')
    ],
  }),
  // headerChild: SettingsButton(1),
})

export const SinkSelector = (type = 'sink') => Widget.Box({
  // title: type + ' Selector',
  // icon: type === 'sink' ? icons.audio.type.headset : icons.audio.mic.unmuted,
  child: Widget.Box({
    className: 'sink-selector',
    vertical: true,
    children: [
      Widget.Box({vertical: true})
        .hook(Audio, box => {
          box.children = Array.from(Audio[sorms(type)].values()).map(SinkItem(type))
        }, 'stream-added')
        .hook(Audio, box => {
          box.children = Array.from(Audio[sorms(type)].values()).map(SinkItem(type))
        }, 'stream-removed')
    ],
  }),
  // headerChild: SettingsButton(type === 'sink' ? 3 : 4),
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'spacing-v-5',
  children: [
    Widget.Box({
      spacing: 8,
      vertical: true,
      children: [
        Widget.Box({
          vertical: true,
          children: [ Volume('sink'), Volume('source') ]
        }),
        SinkSelector('sink'),
        SinkSelector('source'),
        AppMixer(),
      ]
    })
  ]
})
