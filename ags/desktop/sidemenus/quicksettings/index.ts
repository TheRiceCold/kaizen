import { type BoxProps } from 'types/widgets/box'

import MenuRevealer from '../MenuRevealer'
import items from './items'

type ItemType = {
  name: string,
  icon: string,
  content: BoxProps
}

const activeTab = Variable('notificationList')

const Stack = Widget.Stack({
  shown: activeTab.bind(),
  className: 'stack-list',
  transition: 'slide_left_right',
  children: items.reduce((acc, item: ItemType) => {
    acc[item.name] = item.content
    return acc
  }, {}),
})

const StackButton = (stackName: string, label: string) => Widget.Button({
  label, cursor: 'pointer',
  onClicked() { activeTab.value = stackName },
}).hook(activeTab, self => {
  self.toggleClassName('active', activeTab.value === stackName)
})

const Buttons = Widget.Box(
  { className: 'control-buttons' },
  Widget.Box({
    hexpand: true, hpack: 'center',
    children: items.map((item: ItemType) => StackButton(item.name, item.label))
  })
)

export default MenuRevealer('quicksettings', Stack, Buttons)
