import Header from '../Header'

const bluetooth = await Service.import('bluetooth')

const header = Header('Bluetooth', [
  Widget.Switch({
    active: bluetooth.enabled,
    onActivate: () => bluetooth.enabled = !bluetooth.enabled,
  })
])

const list = Widget.Box({
  vertical: true,
  children: bluetooth.bind('devices').as(
    ds => ds.filter(d => d.name).map(
      device => Widget.Box([
        Widget.Icon(device.icon_name + '-symbolic'),
        Widget.Label(device.name),
        Widget.Label({
          label: `${device.battery_percentage}%`,
          visible: device.bind('battery_percentage').as((p: number) => p > 0),
        }),
        Widget.Box({ hexpand: true }),
        Widget.Spinner({
          active: device.bind('connecting'),
          visible: device.bind('connecting'),
        }),
        Widget.Switch({
          active: device.connected,
          visible: device.bind('connecting').as((p: boolean) => !p),
          setup(self) {
            self.on('notify::active', () => device.setConnection(self.active))
          } 
        }),
      ])
    )
  ),
})

export default Widget.Box({
  vertical: true,
  className: 'bluetooth-list',
  children: [ header, list ],
})
