import { type WindowProps } from 'types/widgets/window'

import { HomoBox } from 'widgets'
import { Indicator } from './buttons'

import LeftButtons from './LeftButtons'
import RightButtons from './RightButtons'

import options from 'options'

const { CenterBox, Window } = Widget
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
  HomoBox({ vpack: 'start' }, Indicator),
  RightButtons,
)).hook(style, (self: WindowProps) => self.toggleClassName('separated-style', style.value === 'separated'))
