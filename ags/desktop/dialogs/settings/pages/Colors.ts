import Item from '../Item'
import Page from '../Page'
import Group from '../Group'

import options from 'options'
import icons from 'data/icons'
import {capitalize} from 'lib/utils'

const ColorGroup = (scheme: 'dark' | 'light') => Group(
  capitalize(scheme),
  ...['bg', 'fg', 'primary', 'error', 'widget', 'border'] .map((option, index) => {
    let opt = options.theme[scheme][option]
    let title = capitalize(option)

    switch(option) {
      case 'primary': case 'error':
        title = `On ${capitalize(option)}`
        opt =  options.theme[scheme][option][(index % 2 === 0) ? 'fg' : 'bg']
        break
      case 'bg': title = 'Background'; break
      case 'fg': title = 'Foreground'; break
    }
    return Item({ opt, title, type: 'color' })
  }))

export default Page('Colors', icons.ui.palette, ColorGroup('dark'), ColorGroup('light'))
