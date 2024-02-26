import PanelButton from './PanelButton'
import icons from 'data/icons'
import options from 'options'

const battery = await Service.import('battery')
const { bar, percentage, blocks, width, low } = options.bar.battery

const Indicator = () => Widget.Label({
  setup: self => self.hook(battery, () =>
    self.label = battery.charging || battery.charged ? icons.battery.charging : battery.icon_name)
})

const PercentLabel = () => Widget.Revealer({
  clickThrough: true,
  transition: 'slide_right',
  revealChild: percentage.bind(),
  child: Widget.Label({
    label: battery.bind('percent').as(p => `${p}%`),
  }),
})

const LevelBar = () => {
  const level = Widget.LevelBar({
    mode: 1,
    maxValue: blocks.bind(),
    visible: bar.bind().as(b => b !== 'hidden'),
    value: battery.bind('percent').as(p => (p / 100) * blocks.value),
  })
  const update = () => {
    level.value = (battery.percent / 100) * blocks.value
    level.css = `block { min-width: ${width.value / blocks.value}pt; }`
  }
  return level
    .hook(width, update)
    .hook(blocks, update)
    .hook(bar, () => {
      const barType = (bar.value === 'whole') ? 'fill' : 'center'
      level.vpack = barType
      level.hpack = barType
    })
}

const WholeButton = Widget.Overlay({
  vexpand: true,
  child: LevelBar(),
  className: 'whole',
  passThrough: true,
  overlay: Widget.Box({
    hpack: 'center',
    children: [
      Widget.Icon({
        icon: icons.battery.charging,
        visible: Utils.merge([
          battery.bind('charging'),
          battery.bind('charged'),
        ], (ing, ed) => ing || ed),
      }),
      Widget.Box({
        hpack: 'center',
        vpack: 'center',
        child: PercentLabel(),
      }),
    ],
  }),
})

const Regular = Widget.Box({
  className: 'regular',
  children: [ Indicator(), PercentLabel(), LevelBar() ],
})

export default () => PanelButton({
  hexpand: false,
  className: 'battery-bar',
  visible: battery.bind('available'),
  onClicked: () => percentage.value = !percentage.value,
  child: Widget.Box({
    expand: true,
    visible: battery.bind('available'),
    child: bar.bind().as(b => b === 'whole' ? WholeButton : Regular),
  }),
  setup: self => self
    .hook(bar, w => w.toggleClassName('bar-hidden', bar.value === 'hidden'))
    .hook(battery, w => {
      w.toggleClassName('charging', battery.charging || battery.charged)
      w.toggleClassName('low', battery.percent < low.value)
    }),
})
