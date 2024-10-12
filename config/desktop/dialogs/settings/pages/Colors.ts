import Item from '../Item'
import Page from '../Page'
import Group from '../Group'

import options from 'options'
import icons from 'data/icons'
import { capitalize } from 'lib/utils'

const ColorGroup = (scheme: 'dark' | 'light') =>
  Group(
    capitalize(scheme),
    ...['bg', 'fg', 'primarybg', 'primaryfg', 'errorbg', 'errorfg', 'widget', 'border'].map(option => {
      let opt = options.theme[scheme][option]
      let title = capitalize(option)

      switch (option) {
        case 'bg':
          title = 'Background'
          break
        case 'fg':
          title = 'Foreground'
          break
        case 'primarybg':
          title = 'On Primary Background'
          opt = options.theme[scheme].primary.bg
          break
        case 'primaryfg':
          title = 'On Primary Foreground'
          opt = options.theme[scheme].primary.fg
          break

        case 'errorbg':
          title = 'On Error Background'
          opt = options.theme[scheme].error.bg
          break
        case 'errorfg':
          title = 'On Error Foreground'
          opt = options.theme[scheme].error.fg
          break
      }
      return Item({ opt, title, type: 'color' })
    }),
  )

export default Page(
  'Colors',
  icons.ui.palette,
  ColorGroup('dark'),
  ColorGroup('light'),
)
