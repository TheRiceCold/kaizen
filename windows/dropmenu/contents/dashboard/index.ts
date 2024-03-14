import Header from './header'
import Notifications from './notifications'
import Weather from './Weather'
import options from 'options'

export default Widget.Box({
  vertical: true,
  className: 'dashboard',
  spacing: options.theme.spacing,
  children: [
    Header,
    // Widget.Box({
    //   className: 'calendar',
    //   children: [ Widget.Calendar({ hexpand: true }) ],
    // }),
    Notifications,
    Weather,
  ]
})
