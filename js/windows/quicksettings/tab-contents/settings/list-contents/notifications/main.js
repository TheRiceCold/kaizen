import Header from '../header.js'
import ListContent from './ListContent.js'
import EmptyContent from './EmptyContent.js'
import { FontIcon }from '../../../../../../misc/main.js'
import { setupCursorHover } from '../../../../../../misc/CursorHover.js'
import { icons, services } from '../../../../../../constants/main.js'
const { Notifications } = services

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, empty: EmptyContent },
  setup: self => self.hook(Notifications, self => self.shown = (Notifications.notifications.length > 0 ? 'list' : 'empty')),
})

const ClearButton = Widget.Button({
  child: FontIcon('󰃢'),
  setup: setupCursorHover,
  className: 'action-button',
  tooltipText: 'Clear notifications',
  onClicked: () => Notifications.clear(),
})

const SilenceButton = Widget.Button({
  child: FontIcon('󱏧'),
  setup: setupCursorHover,
  className: 'action-button',
  tooltipText: 'Mute notifications',
  onClicked: self => { 
    Notifications.dnd = !Notifications.dnd
    self.toggleClassName('enabled', Notifications.dnd)
  }
})

export default {
  name: 'notifications',
  icon: icons.notifications.bell,
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ 
      Header('Notifications'), 
      Contents 
    ],
    className: 'notification-list spacing-v-5',
  })
}
