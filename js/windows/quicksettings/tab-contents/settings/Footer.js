import BigButton from './BigButton.js'
import { options } from '../../../../constants/main.js'

const buttons = [
  {
    icon: '',
    title: 'Screenshot',
    tooltip: 'Right click | Fullscreen',
    subComponent: Widget.Label('save as png')
  },
  {
    icon: '',
    title: 'Recorder',
    tooltip: 'Right click | Open directory',
    subComponent: Widget.Label('Click to start')
  },
  {
    icon: '',
    title: 'Color Picker',
    tooltip: 'Right click | Copy code',
    subComponent: Widget.Label({ label: '#DFD1A5', css: 'color: #DFD1A5;' })
  },
  {
    icon: '',
    title: 'Keyboard',
    subComponent: Widget.Label('US'),
    tooltip: 'Click | Open on-screen keyboard',
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
