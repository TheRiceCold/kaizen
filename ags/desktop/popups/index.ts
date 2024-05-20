// import Dock from './dock'
import Media from './media'
import Keyboard from './keyboard'
import ColorTool from './color-tool'
import Notifications from './notifications'
import AnnotationTools from './annotation-tools'

import options from 'options'

const Top = Widget.Window({
  anchor: ['top'],
  name: 'top-popups',
  keymode: 'on-demand',
  exclusivity: 'ignore',
  className: 'top-popups',
  child: Widget.Box({
    vertical: true,
    css: `padding: 2px; margin-top: ${options.theme.spacing * 5}px;`
  },
  Media,
  ColorTool,
  AnnotationTools,
  Notifications()),
})

const Bottom = Widget.Window({
  anchor: ['bottom'],
  name: 'bottom-popups',
  className: 'bottom-popups',
  child: Widget.Box(
    {
      vertical: true,
      css: `padding: 2px; margin-bottom: ${options.theme.spacing}px;`
    },
    /* Indicators, */ Keyboard, /* Dock */
  ),
})

export default [ Top, Bottom ]
