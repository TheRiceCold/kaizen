import { FontIcon }from '../../../../../../misc/main.js'
import { icons } from '../../../../../../constants/main.js'

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
          FontIcon({ icon: icons.notifications.bell, className: 'txt-hugerass' }),
          Widget.Label({ label: 'No notifications', className: 'txt-small' }),
        ]
      }),
    ]
  })]
})

