import Item from '../Item'
import Page from '../Page'
import Group from '../Group'

import options from 'options'
import icons from 'data/icons'

const { dark, light } = options.theme

export default Page('Colors', icons.ui.themes,
  Group('Dark Colors',
    Item({ opt: dark.bg, title: 'Background', type: 'color' }),
    Item({ opt: dark.fg, title: 'Foreground', type: 'color' }),
    Item({ opt: dark.primary.bg, title: 'Primary', type: 'color' }),
    Item({ opt: dark.primary.fg, title: 'On Primary', type: 'color' }),
    Item({ opt: dark.error.bg, title: 'Error', type: 'color' }),
    Item({ opt: dark.error.fg, title: 'On Error', type: 'color' }),
    Item({ opt: dark.widget, title: 'Widget', type: 'color' }),
    Item({ opt: dark.border, title: 'Border', type: 'color' }),
  ),
  Group('Light Colors',
    Item({ opt: light.bg, title: 'Background', type: 'color' }),
    Item({ opt: light.fg, title: 'Foreground', type: 'color' }),
    Item({ opt: light.primary.bg, title: 'Primary', type: 'color' }),
    Item({ opt: light.primary.fg, title: 'On Primary', type: 'color' }),
    Item({ opt: light.error.bg, title: 'Error', type: 'color' }),
    Item({ opt: light.error.fg, title: 'On Error', type: 'color' }),
    Item({ opt: light.widget, title: 'Widget', type: 'color' }),
    Item({ opt: light.border, title: 'Border', type: 'color' }),
  ),
)
