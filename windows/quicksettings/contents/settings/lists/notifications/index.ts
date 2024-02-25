import Header from '../Header'
import ListContent from './Content'
import EmptyContent from './EmptyContent'
import icons from 'lib/icons'
// import { setupCursorHover } from '../../../../../../misc/CursorHover.js'

const notifications = await Service.import('notifications')

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, empty: EmptyContent },
  setup: self => self.hook(notifications, self => self.shown = (notifications.notifications.length > 0 ? 'list' : 'empty')),
})

const ClearButton = Widget.Button({
  child: Widget.Label({ label: '󰃢' }),
  // setup: setupCursorHover,
  className: 'action-button',
  tooltipText: 'Clear notifications',
  onClicked: () => notifications.clear(),
})

const SilenceButton = Widget.Button({
  child: Widget.Label({ label: '󱏧' }),
  // setup: setupCursorHover,
  className: 'action-button',
  tooltipText: 'Mute notifications',
  onClicked: self => {
    notifications.dnd = !notifications.dnd
    self.toggleClassName('enabled', notifications.dnd)
  }
})

export default {
  title: 'Notifications',
  subComponent: Widget.Label({
    setup: self => self.hook(notifications, self => {
      const notifs = notifications.notifications.length
      self.label = (notifs > 0 ? 'New' : 'Empty')
    }, 'notified')
  }),
  icon: '󰂚',
  name: 'notifications',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    className: 'settings-list',
    children: [
      Header('Notifications', [ SilenceButton, ClearButton ]),
      Contents
    ],
  })
}
