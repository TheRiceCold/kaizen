import { Widget, Network, Utils, Applications } from '../../../imports.js'
import { Menu, ArrowToggleButton } from '../ToggleButton.js'
import { FontIcon } from '../../../misc/main.js'

import { icons } from '../../../constants/main.js'

export const NetworkToggle = () => ArrowToggleButton({
  name: 'network',
  icon: FontIcon({
    connections: [[Network, icon => {
      icon.icon = Network.wifi.icon_name || ''
    }]],
  }),
  label: Widget.Label({
    truncate: 'end',
    connections: [[Network, label => {
      label.label = Network.wifi.ssid || 'Not Connected'
    }]],
  }),
  connection: [Network, () => Network.wifi.enabled],
  deactivate: () => Network.wifi.enabled = false,
  activate: () => {
    Network.wifi.enabled = true
    Network.wifi.scan()
  },
})

export const WifiSelection = () => Menu({
  name: 'network',
  icon: FontIcon({
    connections: [[Network, icon => {
      icon.icon = Network.wifi.icon_name
    }]],
  }),
  title: Widget.Label('Wifi Selection'),
  content: [
    Widget.Box({
      vertical: true,
      connections: [[Network, box => box.children =
        Network.wifi?.access_points.map(ap => Widget.Button({
          onClicked: () => Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`),
          child: Widget.Box({
            children: [
              FontIcon(ap.iconName),
              Widget.Label(ap.ssid || ''),
              ap.active && FontIcon({ icon: icons.ui.tick, hexpand: true, hpack: 'end' }),
            ],
          }),
        })),
      ]],
    }),
    Widget.Separator(),
    Widget.Button({
      onClicked: () => Applications.query('gnome-control-center')?.[0].launch(),
      child: Widget.Box({
        children: [ FontIcon(icons.ui.settings), Widget.Label('Network') ],
      }),
    }),
  ],
})
