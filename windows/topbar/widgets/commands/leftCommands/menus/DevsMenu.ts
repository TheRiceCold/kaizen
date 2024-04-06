import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'API tools', onActivate: () => { } },
  { label: 'Waydroid', onActivate: () => { } },
  { label: 'Windows 11 (VM)', onActivate: () => { } },
  { label: 'Debian (Container)', onActivate: () => { } },
]

export default self => Menu(self, commands)
