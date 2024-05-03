import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import { sh } from 'lib/utils'

import { toggleWidget } from 'lib/globals'

const commands: MenuItemProps[] = [
  { label: 'Toggle Terminal', onActivate: () => sh('pypr toggle term') },
  { label: 'AI tools', onActivate: () => toggleWidget('ai-tools') },
  { label: 'BlissOS', onActivate: () => sh('waydroid first-launch') },
  { label: 'Windows 11', onActivate: () => { } },
  { label: 'Debian', onActivate: () => { } },
]

export const openDevMenu = self => Menu(self, commands)
