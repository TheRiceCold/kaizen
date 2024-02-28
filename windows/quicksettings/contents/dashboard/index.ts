import Header from './Header'
import Notifications from './notifications'

export default Widget.Box({
  vertical: true,
  className: 'dashboard',
  children: [
    Header,
    Notifications(),
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar({ hexpand: true }) ],
    }),
  ]
})
