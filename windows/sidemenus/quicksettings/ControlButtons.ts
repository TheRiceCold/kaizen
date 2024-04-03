import { type ButtonProps } from 'types/widgets/button'

import { sh } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

import options from 'options'
import icons from 'data/icons'

import { Stack } from '.'
import stackContents from './stack-contents'

const isActive = Variable('notificationList')

const StackButton = (stackName: string, icon: string) => Widget.Button({ 
  child: Widget.Box([ Widget.Icon({ icon }) ]),
  setup: setupCursorHover,
  onClicked() {
    Stack.shown = stackName
    isActive.value = stackName
  },
}).hook(isActive, (self: ButtonProps) => self.toggleClassName('active', isActive.value === stackName))

const EndButton = (
  icon: string, 
  onClicked: (self: ButtonProps) => void
) => Widget.Button({ 
  onClicked,
  setup: setupCursorHover,
  child: Widget.Icon(icon),
})

export default Widget.Box({
  className: 'control-buttons',
  child: Widget.Box({ 
    hexpand: true,
    spacing: options.theme.spacing,
    children: stackContents.map(
      (item: TStack) => StackButton(item.name, item.icon)
    ).concat([
      Widget.Box({ hexpand: true }),
      EndButton(icons.ui.lock, () => sh('hyprlock')),
      EndButton(icons.ui.settings, () => App.openWindow('settings-dialog'))
    ])
  })
})
