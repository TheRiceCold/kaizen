import { services } from '../../../../../../constants/main.js'
import DisabledContent from './DisabledContent.js'
import ListContent from './ListContent.js'
import Header from '../header.js'

const { Network } = services

const Contents = Widget.Stack({
  transition: 'crossfade',
  transitionDuration: 150,
  children: { list: ListContent, disabled: DisabledContent },
  setup: self => self.hook(Network, self => self.shown = (Network.wifi.enabled ? 'list' : 'disabled')),
})

export default {
  title: Network.wifi.bind('ssid').transform(ssid => ssid.substring(0, 11) || 'Not connected'),
  titleTooltip: Network.wifi.bind('ssid').transform(ssid => ssid || ''),
  icon: Network.wifi.enabled ? '󰖩' : '󰖪',
  sub: '',
  name: 'network',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ Header('Network'), Contents ],
    className: 'settings-list spacing-v-5',
  })
}
