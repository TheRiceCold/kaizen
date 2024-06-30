import Profile from './profile'
import MenuRevealer from '../MenuRevealer'
import ControlButtons from './ControlButtons'

import stackItems, { type TStackItem } from './stack-contents'

export const Stack = Widget.Stack({
  className: 'stack-list',
  transition: 'slide_left_right',
  children: stackItems.reduce((acc, item: TStackItem) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

export default MenuRevealer('quicksettings', Profile, ControlButtons, Stack)
