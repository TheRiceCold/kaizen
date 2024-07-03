import { type BoxProps } from 'types/widgets/box'

import MenuRevealer from '../MenuRevealer'
import items from './items'

type ItemType = {
  name: string,
  icon: string,
  content: BoxProps
}

const isActive = Variable('notificationList')

const Stack = Widget.Stack({
  className: 'stack-list',
  transition: 'slide_left_right',
  children: items.reduce((acc, item: ItemType) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

const StackButton = (stackName: string, icon: string) => Widget.Button({
  cursor: 'pointer',
  child: Widget.Icon(icon),
  onClicked() {
    Stack.shown = stackName
    isActive.value = stackName
  },
}).hook(isActive, self => self.toggleClassName('active', isActive.value === stackName))

const Buttons = Widget.Box(
  { className: 'control-buttons' },
  Widget.Box({
    hexpand: true, hpack: 'center',
    children: items.map((item: ItemType) => StackButton(item.name, item.icon))
  })
)

export default MenuRevealer('quicksettings', Buttons, Stack)
