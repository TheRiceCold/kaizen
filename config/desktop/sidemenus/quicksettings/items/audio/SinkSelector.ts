import { type ButtonProps } from 'types/widgets/button'
import { type Stream } from 'types/service/audio'

import ListRevealer from '../ListRevealer'

import icons from 'data/icons'
import { audioIconSub } from 'lib/utils'
import { VBox } from 'widgets'

type Type = 'microphone' | 'speaker'
const audio = await Service.import('audio')

const { Box, Button, Icon, Label } = Widget

const SinkItem = (type: Type) =>
  (stream: Stream) => Button({
    cursor: 'pointer',
    className: 'sink-button',
    onClicked() { audio[type] = stream },
  }, Box([
    Icon({
      tooltipText: stream.icon_name,
      icon: audioIconSub(stream.icon_name, type),
    }),
    Label(stream.description?.split(' ').slice(0, 4).join(' ')),
    Icon({
      hpack: 'end',
      hexpand: true,
      icon: icons.ui.tick,
    }).hook(audio, (self: ButtonProps) => self.visible = audio[type] === stream),
  ]))

const SinkSelector = (type: Type) =>
  VBox().hook(audio, (self: typeof Widget.Box) => {
    self.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
  }, 'stream-added').hook(audio, (self: Widget.Box) => {
    self.children = Array.from(audio[`${type}s`].values()).map(SinkItem(type))
  }, 'stream-removed')

const SubTitle = (label: string) => Label({ label, xalign: 0, className: 'sub-title' })

export default ListRevealer('Sink Selector', VBox([
  SubTitle('Speakers'),
  SinkSelector('speaker'),
  SubTitle('Microphones'),
  SinkSelector('microphone'),
]))
