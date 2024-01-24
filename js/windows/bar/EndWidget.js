import { App, Widget, Variable, SystemTray } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import {
  Tray,
  SubMenu,
  BatteryBar,
  DateButton,
  Utilities,
  SeparatorDot,
} from './modules/exports.js'

const submenuItems = Variable(1)
SystemTray.connect('changed', () => {
  submenuItems.setValue(Tray.items.length + 1)
})

const Modules = [
  SubMenu({
    items: submenuItems,
    children: [Utilities],
  }),
  Tray,
  SeparatorDot(),
  BatteryBar,
  SeparatorDot(),
  DateButton({ 
    onClicked: () => App.toggleWindow('quicksettings'),
  }),
  RoundedCorner('topright', 'corner-black')
]

export default Widget.Box({ hpack: 'end', className: 'end', children: Modules })
