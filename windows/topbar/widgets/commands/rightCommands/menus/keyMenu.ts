import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'show keys', onActivate: () => {} }, // TODO: implement using showmethekeys-cli
  { label: 'keyboard', onActivate: () => App.openWindow('osk') } ,
]

export default (self: ButtonProps) => Menu(self, commands)
