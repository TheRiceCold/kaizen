import TimeDate from './TimeDate.js'

export default Widget.Window({
  name: 'desktop',
  child: TimeDate,
  layer: 'background',
  className: 'desktop',
  anchor: ['top', 'bottom', 'left', 'right'],
})
