import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'API tools', onActivate: () => { } },
  { label: 'Waydroid', onActivate: () => { } },
  { label: 'Windows 11 (VM)', onActivate: () => { } },
  { label: 'Debian (Container)', onActivate: () => { } },
]

export default (self: ButtonProps) => Menu(self, commands)
