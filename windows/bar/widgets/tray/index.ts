import options from 'options'
import Item from './Item'

const { ignore } = options.bar.tray
const systemtray = await Service.import('systemtray')

export default () => Widget.Box().bind('children', systemtray, 'items', i => i.filter(({ id }) => !ignore.value.includes(id)).map(Item))
