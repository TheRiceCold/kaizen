import { type MenuItemProps } from 'types/widgets/menuitem'
import Menu from '../../Menu'
import ScreenTools from 'service/screen'

const { zoom } = ScreenTools

const commands: MenuItemProps[] = [
  { label: '2x', onActivate: () => zoom(2) } ,
  { label: '3x', onActivate: () => zoom(3) } ,
  { label: 'Custom', onActivate: () => {
    // TODO: Toggle Zoom Input Popup
  } },
]

export default self => Menu(self, commands)
