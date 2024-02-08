import { FontIcon }from '../../../../../misc/main.js'
import { services } from '../../../../../constants/main.js'
import { setupCursorHover } from '../../../../../misc/CursorHover.js'
const { Notifications } = services

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
// const silenceButton = ListActionButton('notifications_paused', 'Silence', (self) => {
  // Notifications.dnd = !Notifications.dnd
  // self.toggleClassName('notif-listaction-btn-enabled', Notifications.dnd)
// })

export default Widget.Box({
  vpack: 'start',
  className: 'spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Notifications',
      className: 'txt-title-small',
    }),
    SilenceButton,
    ClearButton,
  ]
})
