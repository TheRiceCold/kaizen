import { type Props as IconProps } from 'types/widgets/icon'
import { type Props as StackProps } from 'types/widgets/stack'

const network = await Service.import('network')

const FallbackIcon = Widget.Icon().hook(network,
  (self: IconProps) => self.icon = network[network.primary || 'wifi']?.iconName || ''
)

const { Label } = Widget
const WifiIndicator = Widget.Stack({
  transition: 'slide_up_down',
  children: {
    disabled: Label('󰤮'),
    disconnected: Label('󰤭'),
    connecting: Label('󰈁'),
    '0': Label('󰤯'),
    '1': Label('󰤟'),
    '2': Label('󰤢'),
    '3': Label('󰤥'),
    '4': Label('󰤨'),
  },
}).hook(network, (self: StackProps) => {
  const connected = network.wifi.internet == 'connected'
  const notConnected = ['disconnected', 'connecting'].includes(network.wifi.internet)

  if (!network.wifi) return
  self.shown = notConnected && network.wifi.internet
  self.shown = connected && String(Math.ceil(network.wifi.strength / 25))
})

export default Widget.Stack({
  transition: 'slide_up_down',
  children: { wifi: WifiIndicator, fallback: FallbackIcon },
}).hook(network, (self: StackProps) => {
  if (!network.primary) { self.shown = 'wifi'; return }

  const primary = network.primary || 'fallback'
  self.shown = ['wifi'].includes(primary) ? primary : 'fallback'
})
