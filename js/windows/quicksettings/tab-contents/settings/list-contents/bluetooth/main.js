import { services } from '../../../../../../constants/main.js'
import Header from '../header.js'
import ListContent from './ListContent.js'
import DisabledContent from './DisabledContent.js'

const { Bluetooth } = services

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, disabled: DisabledContent },
  setup: self => self.hook(Bluetooth, self => self.shown = (Bluetooth.enabled ? 'list' : 'disabled')),
})

export default {
  icon: '󰂯',
  // icon: Bluetooth.connected_devices.length ? '󰂰' : Bluetooth.enabled ? '󰂯' : '󰂲',
  subComponent: Widget.Label({
    // setup: self => self.hook(Bluetooth, () => {
    //   if (!Bluetooth.enabled)
    // })
  }),
  name: 'bluetooth',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Bluetooth'), Contents ],
    className: 'notification-list spacing-v-5',
  })
}
