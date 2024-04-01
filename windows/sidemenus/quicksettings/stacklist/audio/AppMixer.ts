import { type BoxProps } from 'types/widgets/box'
import { type Stream } from 'types/service/audio'

const audio = await Service.import('audio')

const streamIconSubstiture = (stream: Stream) => {
  const subs = {
    'spotify': 'spotify',
    'Firefox': 'firefox',
  };
  return subs[stream.name] || stream.icon_name
}

const MixerItem = (stream: Stream) => Widget.EventBox({
  onScrollUp: () => stream.volume += 0.03,
  onScrollDown: () => stream.volume -= 0.03,
  onPrimaryClick: () => stream.is_muted = !stream.is_muted,
  child: Widget.Box({
    hexpand: true,
    className: 'mixer-item',
    children: [
      Widget.Icon({
        tooltipText: stream.bind('name').transform((name: string) => name || ''),
        icon: stream.bind('icon_name').transform(() => streamIconSubstiture(stream)),
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
                label: stream.bind('description').transform((desc: string) => desc || ''),
              }),
              Widget.Label({
                xalign: 0,
                className: 'mixer-item-volume',
                label: stream.bind('volume').transform((volume: number) => `${Math.floor(volume * 100)}%`)
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

export default Widget.Box({
  vertical: true,
  children: [
    Widget.Label({ hpack: 'start', label: 'App Mixer' }),
    Widget.Box({ 
      vertical: true ,
      children: audio.bind('apps').as(a => a.map(MixerItem)),
    })
  ]
})
