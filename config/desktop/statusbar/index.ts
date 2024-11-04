import { type WindowProps } from 'types/widgets/window'

import {
  Indicator,
} from './buttons'

import options from 'options'
import LeftButtons from './LeftButtons'
import RightButtons from './RightButtons'

const { Box, CenterBox, Window } = Widget
const { position, style } = options.statusbar

export default Window({
  keymode: 'none',
  name: 'statusbar',
  className: 'statusbar',
  exclusivity: 'exclusive',
  anchor: position.bind().as((p: 'top' | 'bottom') => [p, 'right', 'left']),
}, CenterBox(
  { css: 'min-width: 2px; min-height: 2.5rem;' },
  LeftButtons,
  Box({ vpack: 'start', homogeneous: true }, Indicator),
  RightButtons,
)).hook(style, (self: WindowProps) => self.toggleClassName('separated-style', style.value === 'separated'))
