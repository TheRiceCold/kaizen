import { services } from '../../../../../../constants/main.js'

export default Widget.Box({
  vertical: true,
  setup: self => self.hook(services.Network, () => 
    self.children = services.Network.wifi?.access_points.map(ap => Widget.Button({
      onClicked: () => Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`),
      child: Widget.Box({
        children: [
          Widget.Icon(ap.iconName),
          Widget.Label(ap.ssid || ''),
        ]
      })
    })
  ))
})
