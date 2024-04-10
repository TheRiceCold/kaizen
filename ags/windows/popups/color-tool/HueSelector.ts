import Color from 'service/color'
import { clamp } from 'lib/utils'

const colorWheel = [
  '#ff6666', 
  '#ffff66', 
  '#66dd66', 
  '#66ffff', 
  '#6666ff', 
  '#ff66ff', 
  '#ff6666',
].join(', ')

const range = Widget.Box(
  { className: 'hue-wrapper'}, 
  Widget.Box({
    className: 'hue',
    css: `background: linear-gradient(to bottom, ${colorWheel});`,
  })
)

const slider = Widget.Box({
  vpack: 'start',
  className: 'hue-cursor',
  setup(self) {
    self.hook(Color, () => self.setCss(`margin-top: ${8 * Color.hue / 360}em;`))
  } 
})

export default Widget.EventBox({
  vexpand: true,
  child: Widget.Overlay({ child: range, overlay: slider }),
  attribute: {
    clicked: false,
    setHue(self, event) {
      const [_, __, cursorY] = event.get_coords()
      const widgetHeight = range.child.get_allocated_height()
      const cursorYPercent = clamp(cursorY / widgetHeight, 0, 1)
      Color.hue = Math.round(cursorYPercent * 360)
    }
  },
  setup(self) {
    self.on('motion-notify-event', (_, event) => {
      if (!self.attribute.clicked) return
      self.attribute.setHue(self, event)
    })

    self.on('button-press-event', (_, event) => {
      if (!(event.get_button()[1] === 1)) return // We're only interested in left-click here
      self.attribute.clicked = true
      self.attribute.setHue(self, event)
    })

    self.on('button-release-event', () => self.attribute.clicked = false)
  } 
})
