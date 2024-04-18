import { type MenuItemProps } from 'types/widgets/menuitem'
import { toggleWidget } from 'lib/globals'
import Menu from '../../Menu'

const commands: MenuItemProps[] = [
  { label: 'Show keys', onActivate: () => {} }, // TODO: implement using showmethekeys-cli
  { label: 'Keyboard', onActivate: () => toggleWidget('keyboard') } ,
]

export default self => Menu(self, commands)
