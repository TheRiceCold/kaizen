import { type Stream } from 'types/service/audio'

import { sorm, sorms, iconSubstitute } from './exports'

import icons from 'data/icons'

const audio = await Service.import('audio')

const SinkItem = (type) => (stream: Stream) => Widget.Button({
  onClicked: () => audio[sorm(type)] = stream,
  child: Widget.Box({
    spacing: 5,
    children: [
      Widget.Icon({
        icon: iconSubstitute(stream.icon_name, type),
        tooltip_text: stream.icon_name,
      }),
      Widget.Label(stream.description?.split(' ').slice(0, 4).join(' ')),
      Widget.Icon({
        hpack: 'end',
        hexpand: true,
        icon: icons.ui.tick,
      }).hook(audio, icon => {
        icon.visible = audio[sorm(type)] === stream;
      }),
    ],
  }),
})

const SinkSelector = (type: string) => Widget.Box({ vertical: true })
.hook(audio, box => {
  box.children = Array.from(audio[sorms(type)].values()).map(SinkItem(type))
}, 'stream-added')
.hook(audio, box => {
  box.children = Array.from(audio[sorms(type)].values()).map(SinkItem(type))
}, 'stream-removed')

export default Widget.Box({
  vertical: true,
  children: [
    Widget.Label({ hpack: 'start', label: 'Sink Selector' }),
    SinkSelector('sink'),
    SinkSelector('source'),
  ]
})
