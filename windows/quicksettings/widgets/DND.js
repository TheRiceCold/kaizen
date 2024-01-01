import { Widget, Notifications } from '../../../imports.js'
import { SimpleToggleButton } from '../ToggleButton.js'
import icons from '../../../icons.js'

export default () => SimpleToggleButton({
  icon: Widget.Icon({
    connections: [[Notifications, icon => {
      icon.icon = Notifications.dnd ? icons.notifications.silent : icons.notifications.noisy
    }, 'notify::dnd']],
  }),
  toggle: () => Notifications.dnd = !Notifications.dnd,
  connection: [Notifications, () => Notifications.dnd],
})
