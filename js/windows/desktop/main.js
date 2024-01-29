import { Widget } from '../../imports.js'
import TimeDate from './TimeDate.js'

export default Widget.Window({
  name: 'desktop',
  child: TimeDate,
  layer: 'background',
  className: 'desktop',
  keymode: 'on-demand',
  anchor: ['top', 'bottom', 'left', 'right'],
})
