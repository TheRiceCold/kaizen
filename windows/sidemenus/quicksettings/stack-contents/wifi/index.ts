import { type BoxProps } from 'types/widgets/box'
import Header from '../Header'

import icons from 'data/icons'
import { dependencies, sh } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'

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
    setup: setupCursorHover,
    onClicked: () => { }, // TODO: Open wifi settings
  })
])

const item = (ap: TWifi) => Widget.Button({
  className: 'wifi-item',
  setup: setupCursorHover,
  tooltipText: 'Click to connect',
  onClicked: () => {
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
      setup(self: BoxProps) {
        Utils.idle(() => {
          if (!self.is_destroyed) 
            self.visible = ap.active
        })
      } 
    }),
  ])
})

export default Widget.Box(
  { vertical: true, className: 'wifi-list' },
  header, 
  Widget.Box({
    vertical: true,
    children: wifi.access_points.map(item)
  })
)
