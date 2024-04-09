import { copy } from 'lib/utils'
import { setupCursorHover } from 'misc/cursorhover'
import Color, { hslToHex, hslToRgbValues } from 'service/color'

function update(self) {
  self.hook(Color, self.attribute.update, 'sl')
  self.hook(Color, self.attribute.update, 'hue')
  self.hook(Color, self.attribute.update, 'assigned')
}

const ColorBox = Widget.Box({
  setup: update,
  className: 'color-box',
  attribute: {
    update(self) {
      const { hue, xAxis, yAxis } = Color
      const bgColor = hslToHex(hue, xAxis, yAxis / (1 + xAxis / 100))
      self.setCss(`background-color: ${bgColor};`)
    }
  },
})

const CopyButton = (type: 'hex' | 'rgb' | 'hsl') => Widget.Box([
  Widget.Label({ xalign: 0, label: type.toUpperCase()+':' }),
  Widget.Button({
    tooltipText: 'Click to copy',
    setup(self) { update(self); setupCursorHover(self) },
    attribute: { 
      update(self) {
        const { hue, xAxis, yAxis } = Color
        const x = (1 + xAxis / 100)

        const hexLabel = hslToHex(hue, xAxis, yAxis / x)
        const rgbLabel = hslToRgbValues(hue, xAxis, yAxis / x)
        const hslLabel = `${hue}, ${xAxis}%, ${Math.round(yAxis / x)}%`

        function onCopy(input: string) { copy(input); self.label = 'Copied!' }

        switch(type) {
          case 'hex':
            self.label = hexLabel.toUpperCase()
            self.onClicked = () => onCopy(hexLabel)
            break
          case 'rgb':
            self.label = rgbLabel
            self.onClicked = () => onCopy(`rgb(${rgbLabel})`)
            break
          case 'hsl':
            self.label = hslLabel
            self.onClicked = () => onCopy(`hsl(${hslLabel})`)
            break
        }
      }
    },
  }),
])


export default Widget.Box(
  { className: 'output' },
  Widget.Box(
    {
      hexpand: true, 
      vertical: true,
      vpack: 'center', 
    }, 
    CopyButton('hex'),
    CopyButton('rgb'),
    CopyButton('hsl'),
  ),
  ColorBox, 
)
