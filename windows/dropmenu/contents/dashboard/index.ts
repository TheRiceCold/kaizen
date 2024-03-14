import Header from './header'
import Notifications from './notifications'
import options from 'options'

export default Widget.Box({
  vertical: true,
  className: 'dashboard',
  spacing: options.theme.spacing,
  children: [ Header, Notifications ]
})
