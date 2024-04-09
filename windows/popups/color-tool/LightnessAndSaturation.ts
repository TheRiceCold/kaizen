import Color, { hslToHex } from 'service/color'
import { clamp } from 'lib/utils'

const cursorColor = 
  (Color.xAxis < 40 || (45 <= Color.hue && Color.hue <= 195)) && Color.yAxis > 60 
    ? 'rgba(0,0,0,0.9)' : 'rgba(255,255,255,0.9)'

const range = Widget.Box({
  className: 'saturation',
  attribute: {
    update: self => self.setCss(`background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), linear-gradient(to right, #ffffff, ${hslToHex(Color.hue, 100, 50)});`)
  },
  setup: self => self.hook(Color, self.attribute.update, 'hue').hook(Color, self.attribute.update, 'assigned')
})

const cursor = Widget.Box({
  vpack: 'start',
  hpack: 'start',
  css: `margin-left: ${8 * Color.xAxis / 100}rem; margin-top: ${8 * (100 - Color.yAxis) / 100}rem;`, 
  attribute: {
    update(self) {
      self.setCss(`margin-left: ${8 * Color.xAxis / 100}rem; margin-top: ${8 * (100 - Color.yAxis) / 100}rem;`)
    }
  },
  setup(self) {
    self.hook(Color, self.attribute.update, 'sl').hook(Color, self.attribute.update, 'assigned')
  },
  child: Widget.Box({
    className: 'saturation-cursor',
    css: `background-color: ${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))}; border-color: ${cursorColor}; `,
    attribute: {
      update(self) {
        self.setCss(`
          background-color: ${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))};
          border-color: ${cursorColor};
        `)
      }
    },
    setup(self) {
      self.hook(Color, self.attribute.update, 'sl')
      self.hook(Color, self.attribute.update, 'hue')
      self.hook(Color, self.attribute.update, 'assigned')
    } 
  })
})

export default Widget.EventBox({
  child: Widget.Overlay({ child: range, overlay: cursor }),
  attribute: {
    clicked: false,
    setSaturationAndLightness: (self, event) => {
      const allocation = range.get_allocation()
      const [_, cursorX, cursorY] = event.get_coords()
      const cursorXPercent = clamp(cursorX / allocation.width, 0, 1)
      const cursorYPercent = clamp(cursorY / allocation.height, 0, 1)
      Color.xAxis = Math.round(cursorXPercent * 100)
      Color.yAxis = Math.round(100 - cursorYPercent * 100)
    }
  },
  setup(self) {
    self.on('motion-notify-event', (self, event) => {
      if (!self.attribute.clicked) return
      self.attribute.setSaturationAndLightness(self, event)
    }).on('button-press-event', (self, event) => {
      if (!(event.get_button()[1] === 1)) return
      self.attribute.clicked = true
      self.attribute.setSaturationAndLightness(self, event)
    }).on('button-release-event', self => self.attribute.clicked = false)
  } 
})
