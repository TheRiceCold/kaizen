import { type ButtonProps } from 'types/widgets/button'

import { VBox } from 'widgets'
import { ButtonLabel, LabelIcon } from 'widgets'
import { ChatPlaceholder } from './Textbox'
import GeminiSendMessage from './gemini/SendMessage'

import options from 'options'
import { items, askItemType } from './items'
import { capitalize } from 'lib/utils'

const { Box, Button, Stack } = Widget
export const currentTab = Variable<askItemType>('gemini')

export default VBox([
  // Tab Buttons
  Box(
    { className: 'tab-buttons' },
    Box(
      { hexpand: true, hpack: 'center' },
      ...items.map(({ icon, name }) =>
        Button({
          cursor: 'pointer',
          child: LabelIcon(capitalize(name), icon),
          onClicked() {
            const stackItem = items.find((item) => item.name === name)
            ChatPlaceholder.label = stackItem && stackItem.placeholderText
            currentTab.value = name
          },
        }).hook(currentTab, (self: ButtonProps) => {
          const isActive = currentTab.value === name
          self.toggleClassName('active', isActive)
        }),
      ),
    ),
  ),

  Stack({
    className: 'stack-list',
    shown: currentTab.bind(),
    transition: 'slide_left_right',
    transitionDuration: options.transition,
    children: items.reduce((acc, item) => {
      acc[item.name] = item.content
      return acc
    }, {}),
  }),
  ButtonLabel('/clear', () => GeminiSendMessage('/clear'), { hpack: 'end' }),
])
