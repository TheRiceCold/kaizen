import { Widget, App } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { ColorPicker, ScreenRecorder } from '../../../services/main.js'
import PanelButton from './PanelButton.js'

const { NORTH, SOUTH } = imports.gi.Gdk

const ColorPickerButton = PanelButton({
  className: 'color-picker',
  content: FontIcon(''),
  binds: [[
    'tooltip-text', 
    ColorPicker, 
    'colors', 
    v => `${v.length} colors`
  ]],
  onClicked: () => ColorPicker.pick(),

  onSecondaryClick: btn => {
    if (ColorPicker.colors.length === 0) return
    Widget.Menu({
      className: 'colorpicker',
      children: ColorPicker.colors.map(color => Widget.MenuItem({
        child: Widget.Label(color),
        css: `background-color: ${color};`,
        onActivate: () => ColorPicker.wlCopy(color),
      })),
    }).popup_at_widget(btn, SOUTH, NORTH, null)
  },
})

const ScreenShotButton = PanelButton({
  content: FontIcon(''),
  tooltipText: 'Screenshot',
  onClicked: () => ScreenRecorder.screenshot()
})

const ScreenRecord = PanelButton({
  className: 'recorder',
  tooltipText: 'Screen Record',
  onClicked: () => {
    ScreenRecorder.stop()
  },
  // binds: [['visible', ScreenRecorder, 'recording']],
  content: Widget.Box({
    children: [
      FontIcon('󰕧'),
      // Widget.Label({
      //   binds: [[
      //     'label', ScreenRecorder, 'timer', time => {
      //       const sec = time % 60
      //       const min = Math.floor(time / 60)
      //       return ` ${min}:${sec < 10 ? '0' + sec : sec}`
      //     }
      //   ]],
      // }),
    ],
  }),
})

const OSK = PanelButton({
  content: FontIcon('󰌌'),
  tooltipText: 'On Screen Keyboard',
  onClicked: () => App.toggleWindow('osk')
})

export default Widget.Box({ 
  children: [ 
    ScreenShotButton,
    ScreenRecord,
    ColorPickerButton, 
    OSK,
  ] 
})
