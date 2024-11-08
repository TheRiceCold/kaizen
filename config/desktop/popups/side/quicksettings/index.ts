import { type BoxProps } from 'types/widgets/box'
import { type ButtonProps } from 'types/widgets/button'

import popups from 'service/popups'

import items from './items'

import { ButtonLabel } from 'widgets'
import PopupRevealer from '../../PopupRevealer'

type ItemType = {
  name: string,
  label: string,
  content: BoxProps
}

const { Box, Stack } = Widget
const activeTab = Variable('notificationList')

export default PopupRevealer({
  vertical: true,
  className: 'quicksettings',
  reveal: popups.bind('quicksettings-shown'),
  children: [
    Stack({
      className: 'stack-list',
      transition: 'slide_left_right',
      children: items.reduce((acc, item: ItemType) => {
        acc[item.name] = item.content
        return acc
      }, {}),
    }).bind('shown', activeTab),

    // Control Buttons
    Box(
      { className: 'control-buttons' },
      Box({
        hexpand: true, hpack: 'center',
        children: items.map(({ name, label }: ItemType) =>
          ButtonLabel(label, () => activeTab.value = name).hook(activeTab, (self: ButtonProps) => {
            self.toggleClassName('active', activeTab.value === name)
          })
        )
      })
    )
  ]
})
