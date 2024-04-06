import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Picker', onActivate: () => { } },
  { label: 'Wheel', onActivate: () => { } } ,
]

export default self => Menu(self, commands)
