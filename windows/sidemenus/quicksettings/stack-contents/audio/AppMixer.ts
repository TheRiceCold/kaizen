import { type Stream } from 'types/service/audio'

const audio = await Service.import('audio')

const streamIconSubstitute = (stream: Stream) => {
  const subs = {
    'spotify': 'spotify',
    'Firefox': 'firefox',
  };
  return subs[stream.name] || stream.icon_name
}
const MixerItem = (stream: Stream) => Widget.Box(
  { hexpand: true, className: 'mixer-item' },
  Widget.Icon({
    tooltipText: stream.bind('name').transform((name: string) => name || ''),
    icon: stream.bind('icon_name').transform(() => streamIconSubstitute(stream)),
  }),
  Widget.Box({
    vertical: true,
    vpack: 'center',
    className: 'slider-box',
    children: [
      Widget.Box([
        Widget.Label({
          xalign: 0,
          hexpand: true,
          truncate: 'end',
          label: stream.bind('description').transform((desc: string) => desc || ''),
        }),
        Widget.Label({
          xalign: 0,
          label: stream.bind('volume').transform((volume: number) => `${Math.floor(volume * 100)}%`)
        }),
      ]),
      Widget.Slider({
        hexpand: true,
        draw_value: false,
        value: stream.bind('volume'),
        onChange: ({ value }) => stream.volume = value,
      }),
    ],
  }),
)

export default Widget.Box({
  vertical: true,
  visible: audio.bind('apps').as((a: Stream[]) => a.length > 0),
  children: [
    Widget.Label({ xalign: 0, className: 'title', label: 'App Mixer' }),
    Widget.Box({ 
      vertical: true ,
      children: audio.bind('apps').as((a: Stream[]) => a.map(MixerItem)),
    })
  ]
})
