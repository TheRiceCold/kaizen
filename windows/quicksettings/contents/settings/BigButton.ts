import { setupCursorHover } from 'misc/cursorhover'

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
      Widget.Label({ label: icon, className: 'icon' }),
      Widget.Label({
        label: title,
        className: 'title',
        tooltipText: titleTooltip,
      }),
      subComponent,
    ]
  }), ...props
})
