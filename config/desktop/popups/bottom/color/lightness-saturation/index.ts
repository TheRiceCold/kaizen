import { type EventBoxProps } from 'types/widgets/eventbox'

import color from 'service/color'

import Range from './Range'
import Cursor from './Cursor'

import { clamp } from 'lib/utils'

function setSaturationAndLightness(_self: EventBoxProps, event) {
  const allocation = Range.get_allocation()
  const [_, cursorX, cursorY] = event.get_coords()
  const cursorXPercent = clamp(cursorX / allocation.width, 0, 1)
  const cursorYPercent = clamp(cursorY / allocation.height, 0, 1)
  color.xAxis = Math.round(cursorXPercent * 100)
  color.yAxis = Math.round(100 - cursorYPercent * 100)
}

export default Widget.EventBox({
  className: 'saturation',
  attribute: { clicked: false },
  child: Widget.Overlay({ overlay: Cursor }, Range),
  setup(self: EventBoxProps) {
    self.on('motion-notify-event', (_, event) => {
      if (!self.attribute.clicked) return
      color.picked_hex = ''
      setSaturationAndLightness(self, event)
    }).on('button-press-event', (_, event) => {
      if (!(event.get_button()[1] === 1)) return
      color.picked_hex = ''
      self.attribute.clicked = true
      setSaturationAndLightness(self, event)
    }).on('button-release-event', () => self.attribute.clicked = false)
  }
})
