import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Fullscreen', onActivate: () => { } },
  { label: 'Region', onActivate: () => { } },
  { label: 'Open Files', onActivate: () => { } },
]

export default (self: ButtonProps) => Menu(self, commands)
