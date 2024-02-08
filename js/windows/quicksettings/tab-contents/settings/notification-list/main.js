import Header from './Header.js'
import ListContent from './ListContent.js'
import EmptyContent from './EmptyContent.js'

import { services } from '../../../../../constants/main.js'
const { Notifications } = services

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, empty: EmptyContent },
  setup: self => self.hook(Notifications, self => self.shown = (Notifications.notifications.length > 0 ? 'list' : 'empty')),
})

export default Widget.Box({
  vexpand: true,
  vertical: true,
  children: [ Header, Contents ],
  className: 'notification-list spacing-v-5',
})
