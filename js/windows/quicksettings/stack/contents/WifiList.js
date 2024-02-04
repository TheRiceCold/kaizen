import { Network } from '../../../../imports.js'
// import { FontIcon } from '../../../misc/main.js'
// import { icons } from '../../../constants/main.js'

const Title = Widget.Box({
  vpack: 'start',
  className: 'txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Wi-Fi',
      className: 'txt-title-small margin-left-10',
    })
  ]
})

const Content = Widget.Box({ spacing: 5, vertical: true }).hook(Network, box => {
  box.children = Network.wifi?.access_points.map(ap => Widget.Button({
    onClicked: () => Utils.execAsync(`nmcli device wifi connect ${ap.bssid}`).catch(e => {
      const cmd = ['notify-send', 'Wi-Fi', e, '-A', 'open=Open network manager']
      Utils.execAsync(cmd).then(e => {
        if (e == 'open') Utils.execAsync('foot --title floating nmtui')
      }).catch(e => console.error(e))
    }).catch(e => console.error(e)),
    child: Widget.Box({
      spacing: 8,
      children: [
        // Widget.Icon(ap.iconName),
        Widget.Label({ label: ap.ssid }),
        // ap.active && FontIcon({ hpack: 'end', hexpand: true, icon: icons.tick }),
      ],
    }),
  }))
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'spacing-v-5',
  children: [ Title, Content ],
})
