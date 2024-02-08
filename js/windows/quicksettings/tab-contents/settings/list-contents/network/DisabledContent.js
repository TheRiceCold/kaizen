import { FontIcon }from '../../../../../../misc/main.js'

export default Widget.Box({
  homogeneous: true,
  children: [ Widget.Box({
    vertical: true,
    vpack: 'center',
    className: 'spacing-v-10',
    children: [
      Widget.Box({
        vertical: true,
        className: 'spacing-v-5',
        children: [
          FontIcon({ icon: '󰖪', className: 'txt-hugerass' }),
          Widget.Label({ label: 'Wifi is disabled', className: 'txt-small' }),
        ]
      }),
    ]
  })]
})

