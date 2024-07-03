import { type Stream } from 'types/service/audio'
import ListRevealer from '../ListRevealer'

import icons from 'data/icons'
import { audioIconSub } from 'lib/utils'

type Type = 'microphone' | 'speaker'
const audio = await Service.import('audio')

const SinkItem = (type: Type) => (stream: Stream) => Widget.Button({
  cursor: 'pointer',
  className: 'sink-button',
  onClicked() { audio[type] = stream },
  child: Widget.Box(
    { spacing: 5 },
    Widget.Icon({
      tooltipText: stream.icon_name,
      icon: audioIconSub(stream.icon_name, type),
    }),
    Widget.Label(stream.description?.split(' ').slice(0, 4).join(' ')),
    Widget.Icon({
      hpack: 'end',
      hexpand: true,
      icon: icons.ui.tick,
    }).hook(audio, self => self.visible = audio[type] === stream),
  ),
})

const SinkSelector = (type: Type) => Widget.Box({ vertical: true })
  .hook(audio, self => {
    self.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
  }, 'stream-added').hook(audio, self => {
    self.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
  }, 'stream-removed')

export default ListRevealer('Sink Selector', Widget.Box(
  { vertical: true },
  Widget.Label({ className: 'sub-title', label: 'Speakers', xalign: 0 }),
  SinkSelector('speaker'),
  Widget.Label({ className: 'sub-title', label: 'Microphones', xalign: 0 }),
  SinkSelector('microphone'),
))
