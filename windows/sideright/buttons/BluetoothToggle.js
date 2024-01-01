import { Widget, Utils, Bluetooth } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

export const BluetoothIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['true', FontIcon('󰂯')],
    ['false', FontIcon('󰂲')],
  ],
  setup: (self) => self.hook(Bluetooth, stack => {
    stack.shown = String(Bluetooth.enabled)
  }),
})

export default (props = {}) => Widget.Button({
  tooltipText: 'Bluetooth | Right-click to configure',
  onClicked: () => Utils.exec(`rfkill ${Bluetooth?.enabled ? 'block' : 'unblock'} bluetooth`),
  onSecondaryClickRelease: () => Utils.execAsync(['bash', '-c', 'blueberry &']),
  child: BluetoothIndicator(),
  connections: [[ Bluetooth, btn => btn.toggleClassName('sidebar-button-active', Bluetooth?.enabled) ]],
  setup: setupCursorHover,
  ...props,
})

