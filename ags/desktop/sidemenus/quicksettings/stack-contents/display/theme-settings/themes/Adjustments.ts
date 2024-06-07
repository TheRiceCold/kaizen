import { Item } from '..'
import ListRevealer from '../../../ListRevealer'

import options from 'options'

const { blur, border, widget, radius } = options.theme

export default ListRevealer('Adjustments', Widget.Box(
  { vertical: true },
  Item('Border', { opt: border.width }),
  Item('Roundness', { opt: radius }),
  Item('Blur', { opt: blur, max: 50 }),
  Item('Opacity', { opt: widget.opacity }),
))
