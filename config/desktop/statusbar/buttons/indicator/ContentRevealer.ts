import { type BoxProps } from 'types/widgets/box'
import { type StackProps } from 'types/widgets/stack'

import popups from 'service/popups'

import * as Media from './Media'
import Recorder from './Recorder'

import options from 'options'
import { IndicatorType } from '.'

const { Box, Stack, Revealer } = Widget
const { style, indicator } = options.statusbar

export default (
  isRevealed: typeof Variable<boolean>,
  stackShownName: typeof Variable<IndicatorType>,
) =>
  Box(
    { vpack: 'start', className: 'indicator' },
    Revealer({
      transition: 'slide_down',
      transitionDuration: indicator.timeoutDuration.value,
      child: Stack({
        className: 'stack',
        transition: 'slide_up_down',
        children: {
          ...Media,
          audio: Recorder(''),
          recorder: Recorder(''),
          mic: Box({ hpack: 'center' }),
          volume: Box({ hpack: 'center' }),
          brightness: Box({ hpack: 'center' }),
        },
      })
        .bind('shown', stackShownName)
        .hook(popups, (self: StackProps) =>
          self.shown = popups['player-shown'] ? 'visualizer' : self.shown),
    }).bind('revealChild', isRevealed),
  ).hook(style, (self: BoxProps) =>
    self.toggleClassName('separated-style', style.value === 'separated'),
  )
