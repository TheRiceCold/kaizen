import SidebarModule from './module.js'
import { setupCursorHover } from 'misc/cursorhover.js'

import { sh, clamp } from 'lib/utils'
import Color, { hslToHex, hslToRgbValues } from 'service/color'

export default () => {
  const shouldUseBlackColor = () => ((Color.xAxis < 40 || (45 <= Color.hue && Color.hue <= 195)) && Color.yAxis > 60)

  const colorBlack = 'rgba(0,0,0,0.9)'
  const colorWhite = 'rgba(255,255,255,0.9)'
  const hueRange = Widget.Box({
    css: 'background: linear-gradient(to bottom, #ff6666, #ffff66, #66dd66, #66ffff, #6666ff, #ff66ff, #ff6666);',
  })

  const hueSlider = Widget.Box({
    vpack: 'start',
    homogeneous: true,
    css: `margin-top: ${13.636 * Color.hue / 360}rem;`,
    child: Widget.Box({ className: 'sidebar-module-colorpicker-hue-cursor' }),
    setup: (self) => self.hook(Color, () => {
      self.setCss(`margin-top: ${13.636 * Color.hue / 360}rem;`)
    }),
  })

  const hueSelector = Widget.EventBox({
    child: Widget.Overlay({ child: hueRange, overlays: [hueSlider] }),
    attribute: {
      clicked: false,
      setHue: (self, event) => {
        const widgetHeight = hueRange.children[0].get_allocated_height()
        const [_, __, cursorY] = event.get_coords()
        const cursorYPercent = clamp(cursorY / widgetHeight, 0, 1)
        Color.hue = Math.round(cursorYPercent * 360)
      }
    },
    setup: (self) => self.on('motion-notify-event', (self, event) => {
      if (!self.attribute.clicked) return
      self.attribute.setHue(self, event)
    }).on('button-press-event', (self, event) => {
      if (!(event.get_button()[1] === 1)) return // We're only interested in left-click here
      self.attribute.clicked = true
      self.attribute.setHue(self, event)
    }).on('button-release-event', (self) => self.attribute.clicked = false),
  })

  const saturationAndLightnessRange = Widget.Box({
    attribute: {
      update: (self) => {
        self.setCss(`
          background: linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,1)), linear-gradient(to right, #ffffff, ${hslToHex(Color.hue, 100, 50)});
        `)
      },
    },
    setup: (self) => self
      .hook(Color, self.attribute.update, 'hue')
      .hook(Color, self.attribute.update, 'assigned'),
  })

  const saturationAndLightnessCursor = Widget.Box({
    vpack: 'start',
    hpack: 'start',
    css: `
      margin-left: ${13.636 * Color.xAxis / 100}rem;
      margin-top: ${13.636 * (100 - Color.yAxis) / 100}rem;
    `, // Why 13.636rem? see class name in stylesheet
    attribute: {
      update: (self) => {
        self.setCss(`
          margin-left: ${13.636 * Color.xAxis / 100}rem;
          margin-top: ${13.636 * (100 - Color.yAxis) / 100}rem;
        `) // Why 13.636rem? see class name in stylesheet
      }
    },
    setup: (self) => self
      .hook(Color, self.attribute.update, 'sl')
      .hook(Color, self.attribute.update, 'assigned'),
    child: Widget.Box({
      css: `
        background-color: ${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))};
        border-color: ${shouldUseBlackColor() ? colorBlack : colorWhite};
      `,
      attribute: {
        update: (self) => {
          self.setCss(`
            background-color: ${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))};
            border-color: ${shouldUseBlackColor() ? colorBlack : colorWhite};
          `)
        }
      },
      setup: (self) => self
        .hook(Color, self.attribute.update, 'sl')
        .hook(Color, self.attribute.update, 'hue')
        .hook(Color, self.attribute.update, 'assigned'),
    })
  })

  const saturationAndLightnessSelector = Widget.EventBox({
    child: Widget.Overlay({
      child: saturationAndLightnessRange,
      overlays: [saturationAndLightnessCursor],
    }),
    attribute: {
      clicked: false,
      setSaturationAndLightness: (self, event) => {
        const allocation = saturationAndLightnessRange.children[0].get_allocation()
        const [_, cursorX, cursorY] = event.get_coords()
        const cursorXPercent = clamp(cursorX / allocation.width, 0, 1)
        const cursorYPercent = clamp(cursorY / allocation.height, 0, 1)
        Color.xAxis = Math.round(cursorXPercent * 100)
        Color.yAxis = Math.round(100 - cursorYPercent * 100)
      }
    },
    setup: (self) => self.on('motion-notify-event', (self, event) => {
      if (!self.attribute.clicked) return
      self.attribute.setSaturationAndLightness(self, event)
    }).on('button-press-event', (self, event) => {
      if (!(event.get_button()[1] === 1)) return // We're only interested in left-click here
      self.attribute.clicked = true
      self.attribute.setSaturationAndLightness(self, event)
    }).on('button-release-event', (self) => self.attribute.clicked = false),
  })

  const resultColorBox = Widget.Box({
    css: `background-color: ${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))};`,
    child: Widget.Label({ label: 'Result' }),
    attribute: {
      update: (self) => {
        self.setCss(`background-color: ${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))};`)
        self.children[0].setCss(`color: ${shouldUseBlackColor() ? colorBlack : colorWhite};`)
      }
    },
    setup: (self) => self
      .hook(Color, self.attribute.update, 'sl')
      .hook(Color, self.attribute.update, 'hue')
      .hook(Color, self.attribute.update, 'assigned'),
  })

  const ResultBox = ({ colorSystemName, updateCallback, copyCallback }) => Widget.Box([
    Widget.Box(
      { vertical: true, hexpand: true },
      Widget.Label({ xalign: 0, label: colorSystemName }),
      Widget.Overlay({
        child: Widget.Entry({
          widthChars: 10,
          attribute: { id: 0, update: updateCallback },
          setup: (self) => self
            .hook(Color, self.attribute.update, 'sl')
            .hook(Color, self.attribute.update, 'hue')
            .hook(Color, self.attribute.update, 'assigned'),
        }),
      })
    ),
    Widget.Button({
      setup: setupCursorHover,
      onClicked: (self) => {
        copyCallback(self)
        self.child.label = 'done'
        Utils.timeout(1000, () => self.child.label = 'content_copy')
      },
    })
  ])

  const resultHex = ResultBox({
    colorSystemName: 'Hex',
    updateCallback: (self, id) => {
      if (id && self.attribute.id === id) return
      self.text = hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))
    },
    copyCallback: () => sh(['wl-copy', `${hslToHex(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))}`])
  })
  const resultRgb = ResultBox({
    colorSystemName: 'RGB',
    updateCallback: (self, id) => {
      if (id && self.attribute.id === id) return
      self.text = hslToRgbValues(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))
    },
    copyCallback: () => sh(['wl-copy', `rgb(${hslToRgbValues(Color.hue, Color.xAxis, Color.yAxis / (1 + Color.xAxis / 100))})`]),
  })

  const resultHsl = ResultBox({
    colorSystemName: 'HSL',
    updateCallback: (self, id) => {
      if (id && self.attribute.id === id) return
      self.text = `${Color.hue},${Color.xAxis}%,${Math.round(Color.yAxis / (1 + Color.xAxis / 100))}%`
    },
    copyCallback: () => sh(['wl-copy', `hsl(${Color.hue}, ${Color.xAxis}%, ${Math.round(Color.yAxis / (1 + Color.xAxis / 100))}%)`]),
  })
  const result = Widget.Box(
    { hexpand: true, vertical: true },
    resultColorBox,
    resultHex,
    resultRgb,
    resultHsl,
  )

  return SidebarModule({
    icon: Widget.Icon(''),
    name: 'Color picker',
    revealChild: false,
    child: Widget.Box([
      hueSelector,
      saturationAndLightnessSelector,
      result,
    ])
  })
}
