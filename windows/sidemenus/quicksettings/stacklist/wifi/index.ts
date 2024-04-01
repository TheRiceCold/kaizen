import Header from '../Header'

import icons from 'data/icons'
import { dependencies } from 'lib/utils'

const { wifi } = await Service.import('network')

const header = Header('Wifi', [ 
  Widget.Switch({
    active: wifi.enabled,
    onActivate: () => wifi.enabled = !wifi.enabled,
  })
])

const list = Widget.Box({
  vertical: true,
  children: wifi.access_points.map(ap => Widget.Button({
    onClicked: () => {
      if (dependencies('nmcli'))
        Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`)
    },
    child: Widget.Box([
      Widget.Icon(ap.iconName),
      Widget.Label(ap.ssid || ''),
      Widget.Icon({
        hpack: 'end',
        hexpand: true,
        icon: icons.ui.tick,
        setup(self) {
          Utils.idle(() => {
            if (!self.is_destroyed) 
              self.visible = ap.active
          })
        } 
      }),
    ])
  }))
})

export default Widget.Box({
  vertical: true,
  className: 'wifi-list',
  children: [ header, list ],
})
