import Header from '../Header'

import icons from 'data/icons'
import { dependencies, sh } from 'lib/utils'

const { wifi } = await Service.import('network')

type TWifi = {
  bssid: string,
  address: string,
  lastSeen: number,
  ssid: string,
  active: boolean,
  strength: number,
  frequency: number,
  iconName: string
}

const header = Header('Wifi', [
  Widget.Button({
    label: 'Settings',
    cursor: 'pointer',
    onClicked() {
      if(dependencies('wpa_gui'))
        sh('wpa_gui')
    }
  })
])

const item = (ap: TWifi) => Widget.Button({
  cursor: 'pointer',
  className: 'wifi-item',
  tooltipText: 'Click to connect',
  onClicked() {
    if (dependencies('nmcli'))
      sh(`nmcli device wifi connect ${ap.bssid}`)
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
})

const list = Widget.Scrollable({
  vexpand: true,
  hscroll: 'never',
  vscroll: 'automatic',
  child: Widget.Box({
    vertical: true,
    children: wifi.access_points.sort((a, b) => b.strength - a.strength).slice(0, 10).map(item)
  })
})

export default Widget.Box({ vertical: true, className: 'wifi-list' }, header, list)
