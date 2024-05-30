import { type MenuItemProps } from 'types/widgets/menuitem'

import Menu from '../Menu'
import { sh } from 'lib/utils'

const commands: MenuItemProps[] = [
  { label: 'Files', onActivate() { sh('nautilus') } },
  { label: 'Terminal', onActivate() { sh('pypr toggle term') } },
  { label: 'Windows 11', onActivate() { } },
]

export const openRunMenu = self => Menu(self, commands)
