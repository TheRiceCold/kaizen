import { Item } from '..'
import ListRevealer from './ListRevealer'

import options from 'options'

const { theme: { dark } } = options

export default ListRevealer('Dark Colors', Widget.Box(
  { vertical: true },
  Item('Background', { opt: dark.bg, type: 'color' }),
  Item('Foreground', { opt: dark.fg, type: 'color' }),
  Item('Primary', { opt: dark.primary.bg,  type: 'color' }),
  Item('On Primary', { opt: dark.primary.fg, type: 'color' }),
  Item('Error', { opt: dark.error.bg, type: 'color' }),
  Item('On Error', { opt: dark.error.fg, type: 'color' }),
  Item('Widget', { opt: dark.widget, type: 'color' }),
  Item('Border', { opt: dark.border, type: 'color' }),
))
