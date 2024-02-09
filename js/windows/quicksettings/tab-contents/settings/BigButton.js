import { FontIcon } from '../../../../misc/main.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'

export default ({ 
  icon, 
  title, 
  tooltip = '',
  titleTooltip = '', 
  onClicked = () => {},
  subComponent = Widget.Box({ }) 
}) => Widget.Button({
  onClicked,
  setup: setupCursorHover,
  className: 'toggle-button',
  child: Widget.Box({
    vertical: true,
    tooltipText: tooltip,
    children: [
      FontIcon({ icon, className: 'icon' }),
      Widget.Label({ 
        label: title, 
        className: 'title',
        tooltipText: titleTooltip,
      }),
      subComponent,
    ]
  })
})
