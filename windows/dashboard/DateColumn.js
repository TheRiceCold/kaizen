import { Widget } from '../../imports.js'
import { Clock, FontIcon } from '../../misc/main.js'

import * as vars from '../../variables.js'
import options from '../../options.js'
import icons from '../../icons.js'

const SysProgress = (type, title, unit) => Widget.Box({
  className: `circular-progress-box ${type}`,
  hexpand: true,
  binds: [['tooltipText', vars[type], 'value', v => `${title}: ${Math.floor(v * 100)}${unit}`]],
  child: Widget.CircularProgress({
    hexpand: true,
    className: `circular-progress ${type}`,
    child: FontIcon(icons.system[type]),
    start_at: 0.75,
    binds: [
      ['value', vars[type]],
      ['rounded', options.radii, 'value', v => v > 0],
    ],
  }),
})

export default () => Widget.Box({
  vertical: true,
  className: 'datemenu vertical',
  children: [
    Widget.Box({
      className: 'clock-box',
      vertical: true,
      children: [
        Clock({ format: '%H:%M' }),
        Widget.Label({
          className: 'uptime',
          binds: [['label', vars.uptime, 'value', t => `uptime: ${t}`]],
        }),
      ],
    }),
    Widget.Box({
      className: 'calendar',
      children: [
        Widget.Calendar({ hexpand: true, hpack: 'center' }),
      ],
    }),
    Widget.Box({
      className: 'system-info horizontal',
      children: [
        SysProgress('cpu', 'Cpu', '%'),
        SysProgress('ram', 'Ram', '%'),
        SysProgress('temp', 'Temperature', '°'),
      ],
    }),
  ],
})
