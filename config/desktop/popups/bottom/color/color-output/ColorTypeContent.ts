import { type ButtonProps } from 'types/widgets/button'

import color from 'service/color'

import { copy } from 'lib/utils'

const { Box, Button, Label } = Widget

function update(self: ButtonProps) {
  const { hue, xAxis, yAxis, picked_hex } = color
  const { type } = self.attribute
  const x = (1 + xAxis / 100)

  const hexLabel = picked_hex ? picked_hex : color.hslToHex(hue, xAxis, yAxis / x)
  const hslLabel = picked_hex
    ? color.hexToHsl(picked_hex)
    : `${hue}, ${xAxis}%, ${Math.round(yAxis / x)}%`
  const rgbLabel = picked_hex
    ? color.hexToRgb(picked_hex)
    : color.hslToRgb(hue, xAxis, yAxis / x)

  self.label = (type === 'rgb') ? rgbLabel : (type === 'hsl') ? hslLabel : hexLabel
}

export default (type: 'hex' | 'rgb' | 'hsl') => Box(
  { className: 'color-type-content' },
  Label({ xalign: 0, label: type.toUpperCase()+':' }),
  Button({
    xalign: 0,
    cursor: 'pointer',
    attribute: { type },
    className: 'result-label',
    tooltipText: 'Click to copy',
    onClicked(self: ButtonProps) {
      const label = self.label
      if (self.label === 'Copied!') return

      copy(label)
      self.label = 'Copied!'
      Utils.timeout(1000, () => self.label = label)
    }
  }).hook(color, update))
