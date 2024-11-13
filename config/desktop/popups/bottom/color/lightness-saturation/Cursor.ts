import { type BoxProps } from 'types/widgets/box'

import color from 'service/color'

function updatePos(self: BoxProps) {
  const borderColor =
    ( (color.xAxis < 40 || (45 <= color.hue && color.hue <= 195)) && color.yAxis > 60)
    ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'

  self.setCss([
    `border-color: ${borderColor}`,
    `margin-left: ${8 * color.xAxis / 100}rem`,
    `margin-top: ${8 * (100 - color.yAxis) / 100}rem`,
  ].join(';'))
}

export default Widget.Box({
  hpack: 'start',
  vpack: 'start',
  className: 'cursor',
  setup: (self: BoxProps) => self
    .hook(color, updatePos, 'sl')
    .hook(color, updatePos, 'hue')
    .hook(color, updatePos, 'assigned'),
})
