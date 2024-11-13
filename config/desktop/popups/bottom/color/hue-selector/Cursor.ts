import { type BoxProps } from 'types/widgets/box'

import color from 'service/color'

export default Widget.Box({
  vpack: 'start',
  hpack: 'start',
  className: 'cursor',
  setup(self: BoxProps) {
    self.hook(color, () => self.setCss(`margin-top: ${8 * color.hue / 360}em;`))
  }
})
