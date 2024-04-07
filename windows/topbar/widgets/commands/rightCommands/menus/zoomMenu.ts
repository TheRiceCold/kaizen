import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import ScreenTools from 'service/screen'

const { zoom } = ScreenTools

const commands: MenuItemProps[] = [
  { label: 'Toggle', onActivate: () => zoom() },
  { label: '2x', onActivate: () => zoom(2) } ,
  { label: '3x', onActivate: () => zoom(3) } ,
  { label: '4x', onActivate: () => zoom(4) },
  { label: '5x', onActivate: () => zoom(5) },
]

export default self => Menu(self, commands)
