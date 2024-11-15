import { type BoxProps } from 'types/widgets/box'

import color from 'service/color'

import { ButtonIcon } from 'widgets'

import icons from 'data/icons'

function update(self: BoxProps) {
  const { hue, xAxis, yAxis } = color
  const bgColor = color.picked_hex
    ? color.picked_hex
    : color.hslToHex(hue, xAxis, yAxis / (1 + xAxis / 100))

  self.setCss(`background-color: ${bgColor};`)
}

export default Widget.Overlay({
  child: Widget.Box({ vexpand: true, className: 'result' }).hook(color, update),
  overlay: ButtonIcon(
    icons.ui.colorpicker,
    () => color.pick(), {
      vpack: 'start',
      hpack: 'center',
      tooltipText: 'Pick color',
    }
  )
})
