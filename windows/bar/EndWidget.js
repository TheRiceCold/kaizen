import { App, Widget, SystemTray, Variable, Battery } from '../../imports.js'
import { RoundedCorner } from '../../misc/main.js'
import {
  Tray,
  SubMenu,
  BatteryBar,
  DateButton,
  Utilities,
  ScreenRecord,
  SeparatorDot,
  SystemIndicator,
} from './modules/exports.js'
import { ScreenRecorder } from '../../services/main.js'

const submenuItems = Variable(1)
SystemTray.connect('changed', () => {
  submenuItems.setValue(Tray.items.length + 1)
})

export default Widget.Box({
  hpack: 'end',
  className: 'end',
  children: [
    SubMenu({
      items: submenuItems,
      children: [ Tray, Utilities ],
    }),
    ScreenRecord(),
    SeparatorDot(ScreenRecorder, r => r.recording),
    SeparatorDot(Battery, b => b.available),
    BatteryBar(),
    SeparatorDot(),
    SystemIndicator(),
    SeparatorDot(),
    DateButton({ onClicked: () => App.toggleWindow('sideright') }),
    RoundedCorner('topright', { className: 'corner-black' })
  ],
})
