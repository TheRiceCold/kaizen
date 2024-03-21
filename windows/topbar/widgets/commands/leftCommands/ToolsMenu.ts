import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../Menu'
import { sh } from 'lib/utils'

const commands: MenuItemProps[] = [
  { label: 'Terminal', onActivate: () => sh(`footclient`) },
  { label: 'API tools', onActivate: () => { } },
  { label: 'Waydroid', onActivate: () => { } },
  { label: 'Windows 11 (VM)', onActivate: () => { } },
  { label: 'Debian (Container)', onActivate: () => { } },
]

export const openToolsMenu = (self: ButtonProps) => Menu(self, commands)
