import { type BoxProps } from 'types/widgets/box'
import { type IconProps } from 'types/widgets/icon'
import { type ButtonProps } from 'types/widgets/button'

import popups from 'service/popups'

import BarButton from '../BarButton'

import icons from 'data/icons'

const { Box, Icon } = Widget
const { wifi } = await Service.import('network')
const battery = await Service.import('battery')
const notifications = await Service.import('notifications')

export default BarButton({
  className: 'control-button',
  onClicked(self: typeof BarButton | ButtonProps) {
    popups.toggle('quicksettings')
    self.toggleClassName('active', popups['quicksettings-shown'])
  },
  child: Box([
    // Battery
    Icon({ className: 'battery' }).hook(battery, (self: IconProps) => {
      const { percent: p, charging, available } = battery

      self.visible = available
      self.tooltipText = p + '%'
      self.icon = battery['icon_name']
      self.toggleClassName('charging', charging)
      self.toggleClassName('error', p < 20 && !charging)
    }),

    // Network/Wifi
    Icon().bind('icon', wifi, 'icon_name'),

    // DND
    Box({ className: 'notifications' }).hook(
      notifications,
      (self: BoxProps) => {
        const { dnd, notifications: notifs } = notifications
        const hasNotifs = notifs.length > 0

        //const label = Label(notifs.length + '')
        const icon = Icon(icons.notifications[dnd ? 'silent' : 'default'])
        //label.visible = hasNotifs // TODO: Should not be visible if 0 notifs

        self.children = [icon, /*label*/]

        icon.toggleClassName('active', hasNotifs)
      },
    ),
  ]),
})
