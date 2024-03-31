import { type ButtonProps } from 'types/widgets/button'
import notificationList from './notifications'
import options from 'options'
import icons from 'data/icons'
import { notificationIcon } from 'lib/variables'

const isActive = Variable('notificationList')
const { wifi } = await Service.import('network')
const bluetooth = await Service.import('bluetooth')

const stackItems = [
  { 
    name: 'notificationList', 
    icon: notificationIcon,
    content: notificationList,  
  },
  { 
    name: 'networkList',
    content: Widget.Box([ ]),
    icon: wifi.bind('icon_name'),
  },
  { 
    name: 'bluetoothList',
    content: Widget.Box([ ]),
    icon: bluetooth.bind('enabled').as((p: string) => icons.bluetooth[p ? 'enabled' : 'disabled']),
  },
  { name: 'audioList', 
    icon: icons.audio.type.speaker,
    content: Widget.Box([ ]),
  }
]

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
    children: stackItems.map(item => Button(item.name, item.icon)).concat([
      Widget.Box({ hexpand: true }),
      Widget.Button({ child: Widget.Icon(icons.color.dark) }),
      Widget.Button({ child: Widget.Icon(icons.ui.cup) }),
      Widget.Button({ 
        child: Widget.Icon(icons.ui.settings),
        onClicked: () => App.openWindow('settings-dialog')
      }),
    ])
  })
})

const Stack = Widget.Stack({
  transition: 'slide_down',
  children: stackItems.reduce((acc, item) => {
    acc[item.name] = item.content
    return acc
  }, {})
})

export default [ Buttons, Stack ]
