import { options } from '../../../../constants/main.js'
import { FontIcon } from '../../../../misc/main.js'

export default Widget.Box({
  className: 'footer',
  spacing: options.spacing.value,
  children: [ 
    Widget.Box({
      vertical: true,
      spacing: options.spacing.value,
      children: [
        Widget.Button({ 
          className: 'footer-button',
          child: Widget.Box({
            vertical: true,
            children: [
              FontIcon({ icon: '', className: 'icon' }),
              Widget.Label({ label: 'Screenshot', className: 'title' }),
              Widget.Label({ label: 'save as png' }),
            ]
          })
        }),
        Widget.Button({ 
          className: 'footer-button',
          child: Widget.Box({
            vertical: true,
            children: [
              FontIcon({ icon: '', className: 'icon' }),
              Widget.Label({ label: 'Record', className: 'title' }),
              Widget.Label({ label: 'Click to start' }),
            ]
          })
        }),
        Widget.Button({ 
          className: 'footer-button',
          child: Widget.Box({
            vertical: true,
            children: [
              FontIcon(''),
              Widget.Label({ label: 'Colorpick', className: 'title' }),
              Widget.Label({ label: '#b2b2b2' }),
            ]
          })
        }),
        Widget.Button({ 
          className: 'footer-button',
          child: Widget.Box({
            vertical: true,
            children: [
              FontIcon(''),
              Widget.Label({ label: 'Keyboard', className: 'title' }),
              Widget.Label({ label: 'US' }),
            ]
          })
        }),
      ]
    }),
    Widget.Box({
      className: 'calendar',
      children: [ Widget.Calendar() ]
    })
  ]
})
