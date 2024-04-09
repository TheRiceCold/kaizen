import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'

import { toggleWidget } from 'lib/globals'

const commands: MenuItemProps[] = [
  { label: 'API tools', onActivate: () => toggleWidget('apis') },
  { label: 'Waydroid', onActivate: () => { } },
  { label: 'Windows 11 (VM)', onActivate: () => { } },
  { label: 'Debian (Container)', onActivate: () => { } },
]

export const openDevMenu = self => Menu(self, commands)
