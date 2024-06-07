import { Item } from '..'
import ListRevealer from '../../../ListRevealer'

import options from 'options'

const { theme: { light } } = options

export default ListRevealer('Light Colors', Widget.Box(
  { vertical: true },
  Item('Background', { opt: light.bg, type: 'color' }),
  Item('Foreground', { opt: light.fg, type: 'color' }),
  Item('Primary', { opt: light.primary.bg,  type: 'color' }),
  Item('On Primary', { opt: light.primary.fg, type: 'color' }),
  Item('Error', { opt: light.error.bg, type: 'color' }),
  Item('On Error', { opt: light.error.fg, type: 'color' }),
  Item('Widget', { opt: light.widget, type: 'color' }),
  Item('Border', { opt: light.border, type: 'color' }),
))
