import Header from '../Header'
import ListContent from './Content'
import DisabledContent from './DisabledContent'

const bluetooth = await Service.import('bluetooth')

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, disabled: DisabledContent },
  setup: self => self.hook(bluetooth, self => self.shown = (bluetooth.enabled ? 'list' : 'disabled')),
})

export default {
  icon: '󰂯',
  // icon: Bluetooth.connected_devices.length ? '󰂰' : Bluetooth.enabled ? '󰂯' : '󰂲',
  subComponent: Widget.Label({
    // setup: self => self.hook(Bluetooth, () => {
    //   if (!Bluetooth.enabled)
    // })
  }),
  title: 'Bluetooth',
  name: 'bluetooth',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Bluetooth'), Contents ],
    className: 'settings-list spacing-v-5',
  })
}
