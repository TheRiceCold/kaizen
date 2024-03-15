import PopupWindow from '../PopupWindow'
import Player from './Player'
import options from 'options'

const { bar, media } = options
const layout = Utils.derive(
  [bar.position, media.position],
  (bar, media) => `${bar}-${media}` as const
)

export default PopupWindow({
  name: `media`,
  child: Player,
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up'),
})
