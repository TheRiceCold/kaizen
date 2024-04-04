import { Item } from '..'
import ListRevealer from './ListRevealer'

import options from 'options'

const { font, theme: { 
  blur, border,
  widget, radius,
} } = options

export default ListRevealer('Adjustments', Widget.Box(
  { vertical: true },
  Item('Font', { opt: font.default.name, type: 'font' }),
  Item('Border', { opt: border.width }),
  Item('Roundness', { opt: radius }),
  Item('Blur', { opt: blur, max: 50 }),
  Item('Opacity', { opt: widget.opacity }),
))
