import Header from './Header'
import options from 'options'
import Notifications from './notifications'

export default Widget.Box({
  vertical: true,
  className: 'dashboard',
  spacing: options.theme.spacing,
  children: [
    Header,
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
    Notifications,
  ]
})
