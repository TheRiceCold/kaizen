import stackContents, { type TStackItem } from './stack-contents'
import { Stack } from '.'

const isActive = Variable('notificationList')

const StackButton = (stackName: string, icon: string) => Widget.Button({
  cursor: 'pointer',
  child: Widget.Icon({ icon }),
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
