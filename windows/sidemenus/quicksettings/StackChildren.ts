import notificationList from './notifications'
import icons from 'data/icons'
import { notificationIcon } from 'lib/variables'

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

function Button(stackName: string, icon: string) {
  const ArrowIcon = Widget.Icon({ 
    className: 'arrow-icon',
    icon: icons.ui.arrow.down,
  })

  return Widget.Button({ 
    child: Widget.Box([ Widget.Icon({ icon }), ArrowIcon ]),
    onClicked() {
      Stack.shown = stackName
      ArrowIcon.setCss(`-gtk-icon-transform: rotate(180deg);`)
    }
  })
}

const Buttons = Widget.Box({
  className: 'control-buttons',
  child: Widget.Box({ 
    hexpand: true, hpack: 'center',
    children: stackItems.map(item => Button(item.name, item.icon)).concat([
      Widget.Button({ child: Widget.Icon(icons.color.dark) }),
      Widget.Button({ child: Widget.Icon(icons.ui.cup) }),
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
