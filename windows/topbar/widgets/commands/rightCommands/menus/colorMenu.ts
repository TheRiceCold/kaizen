import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'

import { toggleWidget } from 'lib/globals'

const commands: MenuItemProps[] = [
  { label: 'Pick', onActivate: () => { } },
  { label: 'Wheel', onActivate: () => toggleWidget('color') },
]

export default self => Menu(self, commands)
