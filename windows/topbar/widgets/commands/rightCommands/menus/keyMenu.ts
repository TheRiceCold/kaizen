import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Show keys', onActivate: () => {} }, // TODO: implement using showmethekeys-cli
  { label: 'Keyboard', onActivate: () => App.toggleWindow('osk') } ,
]

export default self => Menu(self, commands)
