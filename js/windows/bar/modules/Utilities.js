import { FontIcon } from '../../../misc/main.js'
import { ColorPicker, ScreenRecord } from '../../../services/main.js'
import PanelButton from './PanelButton.js'

const { NORTH, SOUTH } = imports.gi.Gdk

const ColorPickerButton = PanelButton({
  content: FontIcon(''),
  className: 'color-picker',
  tooltipText: ColorPicker.bind('colors').transform(v => `${v.length} colors`),
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

const ScreenshotButton = PanelButton({
  content: FontIcon(''),
  tooltipText: 'Screenshot',
  onClicked: () => ScreenRecord.screenshot()
})

const ScreenRecordButton = PanelButton({
  className: 'recorder',
  tooltipText: 'Toggle Screen Record',
  onClicked: () => {
    if (ScreenRecord.recording)
      ScreenRecord.stop()
    else
      ScreenRecord.start()
  },
  content: Widget.Box({
    children: [
      FontIcon('󰕧'),
      Widget.Label({
        visible: ScreenRecord.bind('recording'),
        label: ScreenRecord.bind('timer').transform(time => {
          const sec = time % 60
          const min = Math.floor(time / 60)
          return ` ${min}:${sec < 10 ? '0' + sec : sec}`
        }),
      }),
    ],
  }),
})

export default Widget.Box({ 
  children: [ 
    ColorPickerButton,
    ScreenshotButton,
    ScreenRecordButton,
  ] 
})
