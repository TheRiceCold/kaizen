import { App, Widget, Variable, SystemTray } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import {
  Tray,
  SubMenu,
  BatteryBar,
  DateButton,
  Utilities,
  ScreenRecord,
  SeparatorDot,
} from './modules/exports.js'
import { ScreenRecorder } from '../../services/main.js'

const submenuItems = Variable(1)
SystemTray.connect('changed', () => {
  submenuItems.setValue(Tray.items.length + 1)
})

const Modules = [
  SubMenu({
    items: submenuItems,
    children: [ Tray, Utilities ],
  }),
  ScreenRecord,
  SeparatorDot(ScreenRecorder, r => r.recording),
  BatteryBar,
  SeparatorDot(),
  DateButton({ onClicked: () => App.toggleWindow('sideright') }),
  RoundedCorner('topright', 'corner-black')
]

export default Widget.Box({ hpack: 'end', className: 'end', children: Modules })
