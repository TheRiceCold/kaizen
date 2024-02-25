import Header from '../Header'
import ListContent from './Content'
import DisabledContent from './DisabledContent'

const network = await Service.import('network')

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, disabled: DisabledContent },
  setup: self => self.hook(network, self => self.shown = (network.wifi.enabled ? 'list' : 'disabled')),
})

export default {
  title: network.wifi.bind('ssid').transform(ssid => ssid.substring(0, 11) || 'Not connected'),
  titleTooltip: network.wifi.bind('ssid').transform(ssid => ssid || ''),
  icon: network.wifi.enabled ? '󰖩' : '󰖪',
  name: 'network',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Network'), Contents ],
    className: 'settings-list spacing-v-5',
  })
}
