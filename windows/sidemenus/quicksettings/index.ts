import Profile from './profile'
import MenuRevealer from '../MenuRevealer'
import ControlButtons from './ControlButtons'

import stackContents, { type TStackItem } from './stack-contents'

export const Stack = Widget.Stack({
  className: 'stack-list',
  transition: 'slide_down',
  children: stackContents.reduce((acc, item: TStackItem) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

export default MenuRevealer(
  'quicksettings', 
  [ Profile, ControlButtons, Stack ]
)
