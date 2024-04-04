import options from 'options'
import { clock } from 'lib/variables'
import { capitalize } from 'lib/utils'

const battery = await Service.import('battery')
const { interval, format } = options.sideright.profile.clock

const uptime = Variable(0, {
  poll: [
    60_000, 'cat /proc/uptime',
    (line: string) => Number.parseInt(line.split('.')[0]) / 60
  ],
})
function up(up: number) {
  const h = Math.floor(up / 60)
  const m = Math.floor(up % 60)
  return `•  up: ${h}h ${m < 10 ? '0' + m : m}m`
}

const Battery = Widget.Box({
  visible: battery.bind('available'),
  children: [
    Widget.Icon({ icon: battery.bind('icon_name') }),
    Widget.Label({ label: battery.bind('percent').as((p: number) => ` ${p.toFixed()}%`) })
  ]
})

export default Widget.Box({
  hexpand: true,
  vertical: true,
  hpack: 'center',
  className: 'clock-box',
  children: [
    Widget.Label({
      className: 'clock',
      label: Utils.derive(
        [clock(interval), format],
        (c, f: string) => c.format(f) || ''
      ).bind()
    }),
    Widget.Box({
      spacing: options.theme.spacing,
      children: [
        Widget.Label(`${capitalize(Utils.USER)}  •`),
        Battery,
        Widget.Label({
          className: 'uptime',
          label: uptime.bind().as(up)
        }),
      ]
    })
  ],
})
