import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Picker', onActivate: () => { } },
  { label: 'Wheel', onActivate: () => { } } ,
]

export default (self: ButtonProps) => Menu(self, commands)
