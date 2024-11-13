import { type EventBoxProps } from 'types/widgets/eventbox'

import color from 'service/color'

import Range from './Range'
import Cursor from './Cursor'

import { clamp } from 'lib/utils'

function setHue(_self: EventBoxProps, event) {
  const [_, __, cursorY] = event.get_coords()
  const widgetHeight = Range.get_allocated_height()
  const cursorYPercent = clamp(cursorY / widgetHeight, 0, 1)
  color.hue = Math.round(cursorYPercent * 360)
}

export default Widget.EventBox({
  vexpand: true,
  className: 'hue-selector',
  attribute: { clicked: false },
  child: Widget.Overlay({ overlay: Cursor }, Range),
  setup(self: EventBoxProps) {
    self.on('motion-notify-event', (_, event) => {
      if (!self.attribute.clicked) return
      setHue(self, event)
    })

    self.on('button-press-event', (_, event) => {
      if (!(event.get_button()[1] === 1)) return // Left click
      self.attribute.clicked = true
      setHue(self, event)
    })

    self.on('button-release-event', () => self.attribute.clicked = false)
  }
})
