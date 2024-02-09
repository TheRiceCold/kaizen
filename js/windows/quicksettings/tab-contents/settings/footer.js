import { FontIcon } from '../../../../misc/main.js'
import { options } from '../../../../constants/main.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'

const Button = (icon, title, tooltipText, subComponent) => Widget.Button({
  setup: setupCursorHover,
  className: 'footer-button',
  child: Widget.Box({
    tooltipText,
    vertical: true,
    children: [
      FontIcon({ icon, className: 'icon' }),
      Widget.Label({ label: title, className: 'title' }),
      subComponent
    ],
  })
})

export default Widget.Box({
  className: 'footer',
  spacing: options.spacing.value,
  children: [ 
    Widget.Box({
      vertical: true,
      spacing: options.spacing.value,
      children: [
        Button('', 'Screenshot', 'Right click for fullscreen', Widget.Label('save as png')),
        Button('', 'Record', 'Right click open directory', Widget.Label('Click to start')),
        Button('', 'Color Pick', 'Right click to copy', Widget.Label({ label: '#DFD1A5', css: 'color: #DFD1A5;' })),
        Button('', 'Keyboard', 'Click to open on-screen keyboard', Widget.Label('US')),
      ]
    }),
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar() ]
    })
  ]
})
