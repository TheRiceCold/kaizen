import BigButton from './BigButton.js'
import { options } from '../../../../constants/main.js'
import { ColorPicker, ScreenRecord } from '../../../../services/main.js'

const buttons = [
  {
    icon: '',
    title: 'Screenshot',
    tooltip: 'Right click | edit',
    subComponent: Widget.Label('idk yet lol'),
    onClicked: () => ScreenRecord.screenshot(),
  },
  {
    icon: '',
    title: 'Recorder',
    tooltip: 'Click to start',
    subComponent: Widget.Label({
      label: ScreenRecord.bind('timer').transform(time => {
        const sec = time % 60
        const min = Math.floor(time / 60)
        return `${min}:${sec < 10 ? '0' + sec : sec}`
      })
    }),
    onClicked: () => {
      if (ScreenRecord.recording)
        ScreenRecord.stop()
      else
        ScreenRecord.record()
    },
    onSecondaryClick: () => ScreenRecord.recordFullscreen()
  },
  {
    icon: '',
    title: 'Color Picker',
    tooltip: 'Right click | Open menu',
    onClicked: () => ColorPicker.pick(),
    onSecondaryClick: self => {
      const { Gdk } = imports.gi
      if (ColorPicker.colors.length === 0) return
      Widget.Menu({
        className: 'colorpicker',
        children: ColorPicker.colors.map(color => Widget.MenuItem({
          child: Widget.Label(color),
          css: `background-color: ${color};`,
          onActivate: () => ColorPicker.wlCopy(color),
        })),
      }).popup_at_widget(self, Gdk.SOUTH, Gdk.NORTH, null)
    },
    subComponent: Widget.Label({ 
      label: '#DFD1A5', css: 'color: #DFD1A5;' 
    }),
  },
  {
    icon: '',
    title: 'Keyboard',
    subComponent: Widget.Label('US'),
    tooltip: 'Click | Open on-screen keyboard',
    onClicked: () => App.toggleWindow('osk')
  },
]

export default Widget.Box({
  className: 'footer',
  children: [ 
    Widget.Box({
      vertical: true,
      spacing: options.spacing.value,
      children: buttons.map(btn => BigButton(btn))
    }),
    Widget.Box({ hexpand: true }),
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar() ]
    })
  ]
})
