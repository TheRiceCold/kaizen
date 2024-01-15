import { Widget, Network, Utils } from '../../imports.js'
import { FontIcon } from '../../misc/main.js'
import { icons } from '../../constants/main.js'

export default () => Widget.Box({ vertical: true, spacing: 5 }).hook(Network, box => {
  box.children =
    Network.wifi?.access_points.map(ap => Widget.Button({
      onClicked: () => Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`).catch(e => {
        const cmd = ['notify-send', 'Wi-Fi', e, '-A', 'open=Open network manager']
        Utils.execAsync(cmd).then(e => {
          if (e == 'open') 
            Utils.execAsync('nm-connection-editor')
        }).catch(e => console.error(e))
      }).catch(e => console.error(e)),
      child: Widget.Box({
        spacing: 8,
        children: [
          FontIcon(ap.iconName),
          Widget.Label({label: ap.ssid}),
          // @ts-ignore
          ap.active &&
          FontIcon({
            hpack: 'end',
            hexpand: true,
            icon: icons.tick,
          }),
        ],
      }),
    }))
})
