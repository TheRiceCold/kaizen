import { type ButtonProps } from 'types/widgets/button'
import items from './items'
import options from 'options'
import icons from 'data/icons'

const isActive = Variable('notificationList')

const Button = (stackName: string, icon: string) => Widget.Button({ 
  child: Widget.Box([ Widget.Icon({ icon }) ]),
  onClicked() {
    Stack.shown = stackName
    isActive.value = stackName
  }
}).hook(isActive, (self: ButtonProps) => self.toggleClassName('active', isActive.value === stackName))

const Buttons = Widget.Box({
  className: 'control-buttons',
  child: Widget.Box({ 
    hexpand: true,
    spacing: options.theme.spacing,
    children: items.map(item => Button(item.name, item.icon)).concat([
      Widget.Box({ hexpand: true }),
      Widget.ToggleButton({ child: Widget.Icon(icons.ui.cup) }),
      Widget.ToggleButton({ child: Widget.Icon(icons.color.dark) }),
      Widget.Button({ 
        child: Widget.Icon(icons.ui.settings),
        onClicked: () => App.openWindow('settings-dialog')
      }),
    ])
  })
})

const Stack = Widget.Stack({
  className: 'stack-list',
  transition: 'slide_down',
  children: items.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

export default [ Buttons, Stack ]
