import Header from './Header'
import Notifications from './notifications'

export default Widget.Box({
  vertical: true,
  className: 'dashboard',
  children: [
    Header,
    Notifications(),
    Widget.Calendar(),
  ]
})
