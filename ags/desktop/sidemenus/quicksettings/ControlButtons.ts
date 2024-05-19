import stackContents, { type TStackItem } from './stack-contents'
import { Stack } from '.'

import { setupCursorHover } from 'misc/cursorhover'

const isActive = Variable('notificationList')

const StackButton = (stackName: string, icon: string) => Widget.Button({
  child: Widget.Icon({ icon }),
  setup: setupCursorHover,
  onClicked() {
    Stack.shown = stackName
    isActive.value = stackName
  },
}).hook(isActive, self => self.toggleClassName('active', isActive.value === stackName))

export default Widget.Box(
  { className: 'control-buttons' },
  Widget.Box({
    hexpand: true,
    hpack: 'center',
    children: stackContents.map((item: TStackItem) => StackButton(item.name, item.icon))
  })
)
