import { icons, services } from '../../../../../../constants/main.js'
const { Audio } = services

const streamIconSubstitute = stream => {
  const subs = {
    'spotify': 'spotify',
    'Firefox': 'firefox',
  }
  return subs[stream.name] || stream.icon_name
}

const Item = stream => Widget.EventBox({
  onPrimaryClick: () => stream.is_muted = !stream.is_muted,
  onScrollUp: () => stream.volume += 0.03,
  onScrollDown: () => stream.volume -= 0.03,
  child: Widget.Box({
    hexpand: true,
    children: [
      Widget.Icon({
        icon: stream.bind('icon_name').transform(() => streamIconSubstitute(stream)),
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
                label: stream.bind('description').transform(desc => desc || '')
              }),
              Widget.Label({
                xalign: 0,
                label: stream.bind('volume').transform(volume => `${Math.floor(volume * 100)}%`)
              })
            ]
          }),
          Widget.Slider({
            hexpand: true,
            drawValue: false,
            value: stream.bind('volume'),
            onChange: ({ value }) => stream.volume = value
          })
        ]
      })
    ]
  })
})

export default Widget.Box({ 
  vertical: true,
  children: [
    Widget.Box({
      children: [
        Widget.Icon(icons.audio.mixer),
        Widget.Label('App Mixer'),
      ]
    }),
    Widget.Separator({ }),
    Widget.Box({
      vertical: true,
      children: [
        Widget.Box({ vertical: true  }).hook(Audio, box => {
          box.children = Audio.apps.map(Item)
        }, 'notify::apps')
      ]
    })
  ]
})
