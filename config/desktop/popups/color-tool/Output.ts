import Color from 'service/color'

import icons from 'data/icons'
import { copy } from 'lib/utils'

const update = self => self
  .hook(Color, self.attribute.update, 'sl')
  .hook(Color, self.attribute.update, 'hue')
  .hook(Color, self.attribute.update, 'assigned')

const ColorBox = Widget.Box({
  vexpand: true,
  setup: update,
  className: 'color-box',
  attribute: {
    update(self) {
      const { hue, xAxis, yAxis, hslToHex } = Color
      const bgColor = hslToHex(hue, xAxis, yAxis / (1 + xAxis / 100))
      self.setCss(`background-color: ${bgColor};`)
    }
  },
})

const CopyButton = (type: 'hex' | 'rgb' | 'hsl') => Widget.Box([
  Widget.Label({ xalign: 0, label: type.toUpperCase()+':' }),
  Widget.Overlay({
    setup: update,
    attribute: {
      update(self) {
        const { hue, xAxis, yAxis, hslToRgb, hslToHex } = Color
        const x = (1 + xAxis / 100)

        const hexLabel = hslToHex(hue, xAxis, yAxis / x)
        const rgbLabel = hslToRgb(hue, xAxis, yAxis / x)
        const hslLabel = `${hue}, ${xAxis}%, ${Math.round(yAxis / x)}%`

        function onCopy(input: string) { copy(input); self.child.text = 'Copied!' }

        switch(type) {
          case 'hex':
            self.child.text = hexLabel.toUpperCase()
            self.overlay.onClicked = () => onCopy(hexLabel)
            break
          case 'rgb':
            self.child.text = rgbLabel
            self.overlay.onClicked = () => onCopy(`rgb(${rgbLabel})`)
            break
          case 'hsl':
            self.child.text = hslLabel
            self.overlay.onClicked = () => onCopy(`hsl(${hslLabel})`)
            break
        }
      }
    },
    child: Widget.Entry({ widthChars: 10 }),
    overlay: Widget.Button({
      label: '󰆏',
      hpack: 'end',
      cursor: 'pointer',
    }),
  })
])


export default Widget.Box(
  { className: 'output' },
  Widget.Box({
    vertical: true,
    className: 'copy-buttons',
    children: [CopyButton('hex'), CopyButton('rgb'), CopyButton('hsl')]
  }),
  Widget.Box({ vertical: true },
    Widget.Button({ cursor: 'pointer', onClicked: Color.pick }, Widget.Icon(icons.ui.colorpicker)),
    ColorBox, // TODO: Apply picked color
  )
)
