import { type IconProps } from 'types/widgets/icon'
import { type BoxProps } from 'types/widgets/box'
import { type Stream } from 'types/service/audio'

import icons from 'data/icons'
import iconSubstitute from './iconSubstitute'
import { setupCursorHover } from 'misc/cursorhover'

type Type = 'microphone' | 'speaker'
const audio = await Service.import('audio')

const SinkItem = (type: Type) => (stream: Stream) => Widget.Button({
  setup: setupCursorHover,
  className: 'sink-button',
  onClicked: () => audio[type] = stream,
  child: Widget.Box(
    { spacing: 5 },
    Widget.Icon({
      tooltipText: stream.icon_name,
      icon: iconSubstitute(stream.icon_name, type),
    }),
    Widget.Label(stream.description?.split(' ').slice(0, 4).join(' ')),
    Widget.Icon({
      hpack: 'end',
      hexpand: true,
      icon: icons.ui.tick,
    }).hook(audio, (self: IconProps) => self.visible = audio[type] === stream),
  ),
})

const SinkSelector = (type: Type) => Widget.Box({ vertical: true })
  .hook(audio, (self: BoxProps) => {
    self.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
  }, 'stream-added').hook(audio, (self: BoxProps) => {
    self.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
  }, 'stream-removed')

export default Widget.Box(
  { vertical: true },
  Widget.Label({ 
    xalign: 0,
    className: 'title',
    label: 'Sink Selector',
  }),
  Widget.Label({ className: 'sub-title', label: 'Speakers', xalign: 0 }),
  SinkSelector('speaker'),
  Widget.Label({ className: 'sub-title', label: 'Microphones', xalign: 0 }),
  SinkSelector('microphone'),
)
