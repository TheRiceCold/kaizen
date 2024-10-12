import { type StackProps } from 'types/widgets/stack'

import screenTools from 'service/screen'

import { ButtonLabel } from 'widgets'
import * as Media from './Media'
import recorder from './Recorder'

import { showWidget } from 'lib/variables'

const { Box, Stack, Revealer } = Widget
const popupIsShown = showWidget.player

export type StackChildType =
  | 'mic'
  | 'zoom'
  | 'volume'
  | 'recorder'
  | 'pomodoro'
  | 'brightness'

export default (
  isRevealed: typeof Variable<boolean>,
  stackShownName: typeof Variable<StackChildType>
) => Revealer({
  className: 'indicator',
  transition: 'slide_down',
  child: Stack({
    className: 'stack',
    transition: 'slide_up_down',
    children: {
      zoom: ButtonLabel('Click to exit zoom', () => screenTools.zoom()), // async
      pomodoro: Box(), // TODO:
      brightness: Box({ hpack: 'center' }),
      volume: Box({ hpack: 'center' }),
      mic: Box({ hpack: 'center' }),
      recorder,
      ...Media,
    },
  }).bind('shown', stackShownName)
    .hook(popupIsShown, (self: StackProps) => self.shown = popupIsShown.value ? 'visualizer' : self.shown)
}).bind('revealChild', isRevealed)
