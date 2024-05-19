import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import { sh } from 'lib/utils'

import { toggleWidget } from 'lib/globals'

const commands: MenuItemProps[] = [
  { label: 'Terminal', onActivate: () => sh('pypr toggle term') },
  { label: 'AI tools', onActivate: () => toggleWidget('ai-tools') },
  { label: 'Windows 11', onActivate: () => { } },
]

export const openDevMenu = self => Menu(self, commands)
