import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Show keys', onActivate: () => {} }, // TODO: implement using showmethekeys-cli
  { label: 'Keyboard', onActivate: () => App.toggleWindow('osk') } ,
]

export default (self: ButtonProps) => Menu(self, commands)
