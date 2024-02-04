import { services } from '../../../../constants/main.js'

const { Bluetooth } = services

const Title = Widget.Box({
  vpack: 'start',
  className: 'txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Bluetooth',
      className: 'txt-title-small margin-left-10',
    })
  ]
})

const Content = Widget.Box({ 
  hexpand: true, 
  vertical: true 
}).hook(Bluetooth, box => {
  box.children = Bluetooth.devices.map(device => Widget.Box({
    hexpand: false,
    children: [
      Widget.Label(device.name),
      Widget.Box({hexpand: true}),
      // device.connecting ?
      // Widget.Spinner({ active: true }) :
      // Switch({active: device.connected})
      //   .on('notify::active', ({active}) => {
      //     if (active !== device.connected)
      //       device.setConnection(active)
      //   })
    ],
  }))
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'spacing-v-5',
  children: [ Title, Content ]
})
