import { App, Widget, Bluetooth, Network, Notifications } from '../../imports.js'
import { FontIcon } from '../../misc/main.js'

export const NotificationIndicator = (notifCenterName = 'sidebar') => {
  const widget = Widget.Revealer({
    revealChild: false,
    transition: 'slide_left',
    transition_duration: 150,
    setup: self => self.hook(Notifications, (self, id) => {
      if (!id || Notifications.dnd) return
      if (!Notifications.getNotification(id)) return
      self.revealChild = true
    }, 'notified')
      .hook(App, (self, currentName, visible) => {
        if (visible && currentName === notifCenterName) 
          self.revealChild = false
      }),
    child: Widget.Box({
      children: [
        Widget.Label({ label: 'notifications', className: 'txt-norm' }),
        Widget.Label({
          className: 'txt-small titlefont',
          properties: [
            ['increment', self => self._unreadCount++],
            ['markread', self => self._unreadCount = 0],
            ['update', self => self.label = `${self._unreadCount}`],
            ['unreadCount', 0],
          ],
          setup: self => self.hook(Notifications, 
            (self, id) => {
              if (!id || Notifications.dnd) return
              if (!Notifications.getNotification(id)) return
              self._increment(self)
              self._update(self)
            }, 'notified').hook(App, (self, currentName, visible) => {
            if (visible && currentName === notifCenterName) {
              self._markread(self)
              self._update(self)
            }
          }),
        })
      ]
    })
  })
  return widget
}

export const BluetoothIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['true', Widget.Label({ className: 'txt-norm', label: '󰂯' })],
    ['false', Widget.Label({ className: 'txt-norm', label: '󰂲' })],
  ],
  setup: self => self.hook(Bluetooth, stack => stack.shown = String(Bluetooth.enabled)),
})


const NetworkWiredIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['fallback', SimpleNetworkIndicator()],
    ['unknown', Widget.Label({ className: 'txt-norm', label: '󰤭' })],
    ['disconnected', Widget.Label({ className: 'txt-norm', label: '󰤫' })],
    ['connected', Widget.Label({ className: 'txt-norm', label: 'lan' })],
    ['connecting', Widget.Label({ className: 'txt-norm', label: 'settings_ethernet' })],
  ],
  setup: self => self.hook(Network, stack => {
    if (!Network.wired) return
    const { internet } = Network.wired
    stack.shown = ['connecting', 'connected'].includes(internet) 
      ? internet : Network.connectivity !== 'full' 
        ? 'disconnected' : 'fallback'
  }),
})

const SimpleNetworkIndicator = () => FontIcon({
  setup: self => self.hook(Network, self => {
    const icon = Network[Network.primary || 'wifi']?.iconName
    self.icon = icon || ''
    self.visible = icon
  }),
})

const NetworkWifiIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['disabled', Widget.Label({ className: 'txt-norm', label: '󰤭' })],
    ['disconnected', Widget.Label({ className: 'txt-norm', label: '󰤫' })],
    ['connecting', Widget.Label({ className: 'txt-norm', label: '󰈁' })],
    ['0', Widget.Label({ className: 'txt-norm', label: '󰤯' })],
    ['1', Widget.Label({ className: 'txt-norm', label: '󰤟' })],
    ['2', Widget.Label({ className: 'txt-norm', label: '󰤢' })],
    ['3', Widget.Label({ className: 'txt-norm', label: '󰤥' })],
    ['4', Widget.Label({ className: 'txt-norm', label: '󰤨' })],
  ],
  setup: self => self.hook(Network, stack => {
    if (!Network.wifi) return
    if (Network.wifi.internet == 'connected')
      stack.shown = String(Math.ceil(Network.wifi.strength / 25))
    else if (['disconnected', 'connecting'].includes(Network.wifi.internet))
      stack.shown = Network.wifi.internet
  }),
})

export const NetworkIndicator = () => Widget.Stack({
  transition: 'slide_up_down',
  items: [
    ['fallback', SimpleNetworkIndicator()],
    ['wifi', NetworkWifiIndicator()],
    ['wired', NetworkWiredIndicator()],
  ],
  setup: self => self.hook(Network, stack => {
    if (!Network.primary) {
      stack.shown = 'wifi'
      return
    }
    const primary = Network.primary || 'fallback'
    stack.shown = ['wifi', 'wired'].includes(primary) ? primary : 'fallback'
  }),
})

export const StatusIcons = (props = {}) => Widget.Box({
  ...props,
  child: Widget.Box({
    className: 'spacing-h-15',
    children: [
      NotificationIndicator(),
      BluetoothIndicator(),
      NetworkIndicator(),
    ]
  })
})
