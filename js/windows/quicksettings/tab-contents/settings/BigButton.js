import { FontIcon } from '../../../../misc/main.js'
import { setupCursorHover } from '../../../../misc/CursorHover.js'

export default ({ 
  icon, 
  title, 
  list = null,
  tooltip = '',
  titleTooltip = '', 
  subComponent = Widget.Box({ }),
  ...props
}) => Widget.Button({
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
  }), ...props
})
