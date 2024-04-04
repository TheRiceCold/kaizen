import { type ButtonProps } from 'types/widgets/button'

import { setupCursorHover } from 'misc/cursorhover'

import { Stack } from '.'
import stackContents from './stack-contents'

const isActive = Variable('notificationList')

const StackButton = (stackName: string, icon: string) => Widget.Button({ 
  child: Widget.Icon({ icon }),
  setup: setupCursorHover,
  onClicked() {
    Stack.shown = stackName
    isActive.value = stackName
  },
}).hook(isActive, (self: ButtonProps) => self.toggleClassName('active', isActive.value === stackName))

export default Widget.Box(
  { className: 'control-buttons' },
  Widget.Box({ 
    hexpand: true,
    hpack: 'center',
    children: stackContents.map((item: TStack) => StackButton(item.name, item.icon))
  })
)
