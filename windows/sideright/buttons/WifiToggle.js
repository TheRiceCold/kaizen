import { Widget, Network, Utils } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const NetworkWifiIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['disabled', FontIcon('󰤮')],
    ['disconnected', FontIcon('󰤭')],
    ['connecting', FontIcon('󰇘')],
    ['0', FontIcon('󰤯')],
    ['1', FontIcon('󰤟')],
    ['2', FontIcon('󰤢')],
    ['3', FontIcon('󰤥')],
    ['4', FontIcon('󰤨')],
  ],
  setup: (self) => self.hook(Network, (stack) => {
    if (!Network.wifi) return
    if (Network.wifi.internet == 'connected')
      stack.shown = String(Math.ceil(Network.wifi.strength / 25))
    else if (Network.wifi.internet == 'disconnected' || Network.wifi.internet == 'connecting')
      stack.shown = Network.wifi.internet
  }),
})

const NetworkWiredIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['fallback', FontIcon('󰤨')],
    ['unknown', FontIcon('󰈂')],
    ['disconnected', FontIcon('󰈂')],
    ['connected', FontIcon('󰈁')],
    ['connecting', FontIcon('󰇘')],
  ],
  setup: (self) => self.hook(Network, stack => {
    if (!Network.wired) return

    const { internet } = Network.wired
    if (internet === 'connected' || internet === 'connecting')
      stack.shown = internet
    else if (Network.connectivity !== 'full')
      stack.shown = 'disconnected'
    else stack.shown = 'fallback'
  }),
})

const NetworkIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['fallback', FontIcon('󰤨')],
    ['wifi', NetworkWifiIndicator()],
    ['wired', NetworkWiredIndicator()],
  ],
  setup: self => self.hook(Network, stack => {
    if (!Network.primary) {
      stack.shown = 'wifi'
      return
    }
    const primary = Network.primary || 'fallback'
    stack.shown = (primary == 'wifi' || primary == 'wired') ? primary : 'fallback'
  }),
})

export default Widget.Button({
  onClicked: Network.toggleWifi,
  className: 'sidebar-iconbutton',
  tooltipText: 'Wifi | Right-click to configure',
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi', '&'])
  },
  child: NetworkIndicator(),
  connections: [
    [Network, btn => {
      btn.toggleClassName(
        'sidebar-button-active',
        Network.wifi?.internet == 'connected' || Network.wired?.internet == 'connected'
      )
    }],
    [Network, btn => {
      btn.tooltipText = (`${Network.wifi?.ssid} | Right-click to configure` || 'Unknown')
    }],
  ], setup: setupCursorHover,
})
