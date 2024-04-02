import { type Stream } from 'types/service/audio'

import icons from 'data/icons'
import iconSubstitute from './iconSubstitute'

type Type = 'microphone' | 'speaker'
const audio = await Service.import('audio')

const SinkItem = (type: Type) => (stream: Stream) => Widget.Button({
  className: 'sink-button',
  onClicked: () => audio[type] = stream,
  child: Widget.Box({
    spacing: 5,
    children: [
      Widget.Icon({
        tooltipText: stream.icon_name,
        icon: iconSubstitute(stream.icon_name, type),
      }),
      Widget.Label(stream.description?.split(' ').slice(0, 4).join(' ')),
      Widget.Icon({
        hpack: 'end',
        hexpand: true,
        icon: icons.ui.tick,
      }).hook(audio, icon => icon.visible = audio[type] === stream),
    ],
  }),
})

const SinkSelector = (type: Type) => Widget.Box({ vertical: true }).hook(audio, box => {
  box.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
}, 'stream-added').hook(audio, box => {
  box.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
}, 'stream-removed')

export default Widget.Box({
  vertical: true,
  children: [
    Widget.Label({ 
      xalign: 0,
      className: 'title',
      label: 'Sink Selector',
    }),
    Widget.Label({ className: 'sub-title', label: 'Speakers', xalign: 0 }),
    SinkSelector('speaker'),
    Widget.Label({ className: 'sub-title', label: 'Microphones', xalign: 0 }),
    SinkSelector('microphone'),
  ]
})
