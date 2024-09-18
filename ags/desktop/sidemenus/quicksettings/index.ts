import { type BoxProps } from 'types/widgets/box'

import MenuRevealer from '../MenuRevealer'
import { ButtonLabel } from 'widgets'

import items from './items'

type ItemType = {
  name: string,
  label: string,
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

export default MenuRevealer('quicksettings', Stack,
  Widget.Box({ className: 'control-buttons' },
    Widget.Box({
      hexpand: true, hpack: 'center',
      children: items.map(({ name, label }: ItemType) =>
        ButtonLabel(label, () => activeTab.value = name)
          .hook(activeTab, self => {
            self.toggleClassName('active', activeTab.value === name)
          }))
    })
  ))
