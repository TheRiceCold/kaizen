import Media from './media'
import ColorTool from './color-tool'
import Notifications from './notifications'
import AnnotationTools from './annotation-tools'

import options from 'options'

const Top = Widget.Window({
  anchor: ['top'],
  name: 'top-popups',
  className: 'popups',
  keymode: 'on-demand',
  exclusivity: 'ignore',
  child: Widget.Box({
    vertical: true,
    children: [ AnnotationTools, Media, ColorTool, Notifications() ],
    css: `padding: 2px; margin-top: ${options.theme.spacing * 4}px;`,
  }),
})

const Bottom = Widget.Window({
  anchor: ['bottom'],
  className: 'popups',
  name: 'bottom-popups',
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    // children: [ Indicators, Keyboard, Dock ], // TODO:
  }),
})

export default [ Top, Bottom ]
