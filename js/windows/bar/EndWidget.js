import { SystemTray } from '../../imports.js'
import { RoundedCorner, FontIcon } from '../../misc/main.js'
import {
  Tray,
  SubMenu,
  Utilities,
  BatteryBar,
  PanelButton,
} from './modules/exports.js'

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
    content: FontIcon(''),
    onClicked: () => App.toggleWindow('quicksettings'),
  }),
  RoundedCorner('topright', 'corner-black'),
]

export default Widget.Box({ hpack: 'end', className: 'end', children: Modules })
