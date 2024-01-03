import { Notifications } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { SimpleToggleButton } from '../ToggleButton.js'
import { icons } from '../../../constants/main.js'

export default () => SimpleToggleButton({
  icon: FontIcon({
    connections: [[Notifications, icon => {
      icon.icon = Notifications.dnd ? icons.notifications.silent : icons.notifications.noisy
    }, 'notify::dnd']],
  }),
  toggle: () => Notifications.dnd = !Notifications.dnd,
  connection: [Notifications, () => Notifications.dnd],
})
