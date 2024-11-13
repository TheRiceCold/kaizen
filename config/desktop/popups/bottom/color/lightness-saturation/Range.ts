import { type BoxProps } from 'types/widgets/box'

import color from 'service/color'

function update(self: BoxProps) {
  const bottom = 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1))'
  const right = `linear-gradient(to right, #ffffff, ${color.hslToHex(color.hue, 100, 50)})`
  self.setCss(`background: ${bottom}, ${right};`)
}

export default Widget.Box({ className: 'range' })
  .hook(color, update, 'hue')
  .hook(color, update, 'assigned')
