import { options, services } from '../../constants/main.js'
import { RoundedCorner, FontIcon, Clock } from '../../misc/main.js'
import {
  Tray,
  SubMenu,
  Utilities,
  BatteryBar,
  PanelButton,
} from './modules/exports.js'

const { SystemTray } = services
const submenuItems = Variable(1)
SystemTray.connect('changed', () => {
  submenuItems.setValue(SystemTray.items.length + 1)
})

const Modules = [
  SubMenu({
    items: submenuItems,
    children: [Utilities],
  }),
  Tray,
  BatteryBar,
  PanelButton({
    content: Widget.Box({
      spacing: options.spacing.value * 1.5,
      children: [
        Clock({ format: '%a %d • %I:%M' }),
        FontIcon(''),
      ]
    }),
    onClicked: () => App.toggleWindow('quicksettings'),
  }),
  RoundedCorner('topright', 'corner-black'),
]

export default Widget.Box({ 
  hpack: 'end', 
  className: 'end', 
  children: Modules 
})
