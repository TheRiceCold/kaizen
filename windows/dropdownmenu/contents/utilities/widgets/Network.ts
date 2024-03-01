import { Menu, ArrowToggleButton } from '../ToggleButton'

import options from 'options'
import icons from 'data/icons'
import { dependencies, sh } from 'lib/utils'

const { wifi } = await Service.import('network')

export const NetworkToggle = () => ArrowToggleButton({
  name: 'network',
  icon: wifi.bind('icon_name'),
  deactivate: () => wifi.enabled = false,
  connection: [ wifi, () => wifi.enabled ],
  activate: () => { wifi.enabled = true; wifi.scan() },
  label: wifi.bind('ssid').as(ssid => ssid || 'Not Connected'),
})

export const WifiSelection = () => Menu({
  name: 'network',
  title: 'Wifi Selection',
  icon: wifi.bind('icon_name'),
  content: [
    Widget.Box({
      vertical: true,
      setup: self => self.hook(wifi, () =>
        self.children = wifi.access_points.map(ap => Widget.Button({
          onClicked: () => {
            if (dependencies('nmcli'))
              sh(`nmcli device wifi connect ${ap.bssid}`)
          },
          child: Widget.Box({
            children: [
              Widget.Icon(ap.iconName),
              Widget.Label(ap.ssid || ''),
              Widget.Icon({
                hpack: 'end',
                hexpand: true,
                icon: icons.ui.tick,
                setup: self => Utils.idle(() => {
                  if (!self.is_destroyed) self.visible = ap.active
                }),
              }),
            ],
          }),
        })),
      ),
    }),
    Widget.Separator(),
    Widget.Button({
      onClicked: () => sh(options.menu.networkSettings.value),
      child: Widget.Box({
        children: [
          Widget.Icon(icons.ui.settings),
          Widget.Label('Network'),
        ],
      }),
    }),
  ],
})
