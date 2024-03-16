const network = await Service.import('network')

const FallbackIcon = Widget.Icon({
  setup: self => self.hook(network, self => {
    const icon = network[network.primary || 'wifi']?.iconName
    self.icon = icon || ''
    self.visible = icon
  }),
})

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
  setup: self => self.hook(network, stack => {
    if (!network.wifi) return
    if (network.wifi.internet == 'connected')
      stack.shown = String(Math.ceil(network.wifi.strength / 25))
    else if (['disconnected', 'connecting'].includes(network.wifi.internet))
      stack.shown = network.wifi.internet
  }),
})

export default Widget.Stack({
  transition: 'slide_up_down',
  children: {
    wifi: WifiIndicator,
    fallback: FallbackIcon,
  },
  setup: self => self.hook(network, stack => {
    if (!network.primary) {
      stack.shown = 'wifi'
      return
    }
    const primary = network.primary || 'fallback'
    stack.shown = ['wifi'].includes(primary) ? primary : 'fallback'
  }),
})
