import options from 'options'
import Item from './Item'
import ArrowIcon from '../../ArrowIcon'

const direction = 'left'
const { ignore } = options.bar.tray
const systemtray = await Service.import('systemtray')

const Revealer = Widget.Revealer({
  transition: `slide_${direction}`,
  child: Widget.Box().bind(
    'children', systemtray, 'items',
    i => i.filter(({ id }) => !ignore.value.includes(id)).map(Item))
})

const Icon = ArrowIcon({ direction, revealer: Revealer })

export default () => Widget.Box([ Icon, Revealer, Widget.Separator() ])
