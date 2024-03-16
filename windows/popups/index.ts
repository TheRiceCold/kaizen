import options from 'options'
import Media from './media'
import Notifications from './notifications'

export default Widget.Window({
  name: `popups`,
  className: 'popups',
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ Media, Notifications() ]
  }),
  anchor: options.notifications.position.bind(),
})
