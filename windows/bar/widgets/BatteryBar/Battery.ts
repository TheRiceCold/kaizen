import Icon from './Icon'
import options from 'options'

const battery = await Service.import('battery')
const { percentage, blocks, width } = options.bar.battery

const PercentLabel = Widget.Box({
  hpack: 'center',
  vpack: 'center',
  child: Widget.Revealer({
    clickThrough: true,
    transition: 'slide_right',
    revealChild: percentage.bind(),
    child: Widget.Label({
      label: battery.bind('percent').as(p => `${p}%`),
    }),
  })
})

const LevelBar = () => {
  const level = Widget.LevelBar({
    vpack: 'fill',
    hpack: 'fill',
    bar_mode: 'discrete',
    maxValue: blocks.bind(),
    value: battery.bind('percent').as(p => (p / 100) * blocks.value),
  })
  const update = () => {
    level.value = (battery.percent / 100) * blocks.value
    level.css = `block { min-width: ${width.value / blocks.value}pt; }`
  }
  return level.hook(width, update).hook(blocks, update)
}

export default Widget.Box({
  expand: true,
  visible: battery.bind('available'),
  child: Widget.Overlay({
    vexpand: true,
    child: LevelBar(),
    className: 'whole',
    passThrough: true,
    overlay: Widget.Box({
      hpack: 'center',
      children: [ Icon, PercentLabel ],
    }),
  })
})
