import { Network } from '../../../../../../constants/services.js'
import Header from '../header.js'

const List = Widget.Box({
  vertical: true,
  setup: self => self.hook(Network, () => 
    self.children = Network.wifi?.access_points.map(ap => Widget.Button({
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

export default {
  icon: '󰖩',
  sub: '',
  name: 'network',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Network'), List ],
    className: 'notification-list spacing-v-5',
  })
}
