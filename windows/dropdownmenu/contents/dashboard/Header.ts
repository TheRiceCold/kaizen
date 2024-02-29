import options from 'options'
import icons from 'data/icons'
import { bash } from 'lib/utils'

const battery = await Service.import('battery')
const { GLib } = imports.gi
const { image, size } = options.menu.dashboard.avatar

const clock = Variable(GLib.DateTime.new_now_local(), {
  poll: [1000, () => GLib.DateTime.new_now_local()],
})

const uptime = Variable(0, { poll: [
  60_000,
  'cat /proc/uptime',
  line => Number.parseInt(line.split('.')[0]) / 60],
})

function up(up: number) {
  const h = Math.floor(up / 60)
  const m = Math.floor(up % 60)
  return `up: ${h}h ${m < 10 ? '0' + m : m}m`
}

const Avatar = Widget.Box({
  className: 'avatar',
  css: Utils.merge([image.bind(), size.bind()], (img, size) => `
    min-width: ${size}px;
    min-height: ${size}px;
    background-image: url('${img}');
    background-size: cover;`),
})

export default Widget.Box({
  className: 'header',
  children: [
    Avatar,
    Widget.Box({
      hexpand: true,
      vertical: true,
      hpack: 'center',
      className: 'clock-box',
      children: [
        Widget.Label({
          className: 'clock',
          label: clock.bind().as(t => t.format('%I:%M')!),
        }),
        Widget.Box([
          Widget.Box({
            visible: battery.bind('available'),
            children: [
              Widget.Icon({ icon: battery.bind('icon_name') }),
              Widget.Label({ label: battery.bind('percent').as(p => ` ${p}%  |`) })
            ]
          }),
          Widget.Box([
            Widget.Icon({ icon: icons.ui.time }),
            Widget.Label({
              className: 'uptime',
              label: uptime.bind().as(up)
            }),
          ])
        ])
      ],
    }),
    Widget.Button({
      vpack: 'center',
      child: Widget.Icon(icons.ui.lock),
      // onClicked: () => bash`hyprctl reload`,
    }),
    Widget.Button({
      vpack: 'center',
      child: Widget.Icon(icons.powermenu.shutdown),
      onClicked: () => App.openWindow('powermenu'),
    })
  ]
})
