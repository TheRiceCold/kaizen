import powermenu, { Action } from 'service/powermenu'
import options from 'options'
import icons from 'data/icons'

const battery = await Service.import('battery')
const { image, size } = options.quicksettings.avatar

function up(up: number) {
  const h = Math.floor(up / 60)
  const m = Math.floor(up % 60)
  return `${h}h ${m < 10 ? '0' + m : m}m`
}

const uptime = Variable(0, { poll: [
  60_000,
  'cat /proc/uptime',
  line => Number.parseInt(line.split('.')[0]) / 60],
})

const SysButton = (action: Action) => Widget.Button({
  vpack: 'center',
  child: Widget.Icon(icons.powermenu[action]),
  onClicked: () => powermenu.action(action),
})

const Avatar = Widget.Box({
  className: 'avatar',
  css: Utils.merge([image.bind(), size.bind()], (img, size) => `
    min-width: ${size}px;
    min-height: ${size}px;
    background-image: url('${img}');
    background-size: cover;`),
})

export default Widget.Box([
  Avatar,
  Widget.Box({
    vertical: true,
    vpack: 'center',
    children: [
      Widget.Box({
        visible: battery.bind('available'),
        children: [
          Widget.Icon({ icon: battery.bind('icon_name') }),
          Widget.Label({ label: battery.bind('percent').as(p => `${p}%`) })
        ]
      }),
      Widget.Box([
        Widget.Icon({ icon: icons.ui.time }),
        Widget.Label({ label: uptime.bind().as(up) }),
      ])
    ]
  }),
  Widget.Box({ hexpand: true }),
  Widget.Button({
    vpack: 'center',
    child: Widget.Icon(icons.ui.settings),
    onClicked: () => {
      App.closeWindow('quicksettings')
      App.closeWindow('settings-dialog')
      App.openWindow('settings-dialog')
    },
  }),
  SysButton('logout'),
  SysButton('shutdown'),
])
