// import Dock from './dock'
import Media from './media'
import Keyboard from './keyboard'
import ColorTool from './color-tool'
import Indicators from './indicator'
import Notifications from './notifications'
import AnnotationTools from './annotation-tools'

import options from 'options'
const { spacing } = options.theme

const popupWindow = ({
  children, position,
  marginMultiplier = 1,
}: { position: 'top' | 'bottom' }) => Widget.Window({
  anchor: [position],
  keymode: 'on-demand',
  exclusivity: 'ignore',
  name: `${position}-popups`,
  className: `${position}-popups`,
  child: Widget.Box({
    children,
    vertical: true,
    css: `padding: 2px; margin-${position}: ${spacing * marginMultiplier};`,
  })
})

export default [
  popupWindow({
    position: 'top',
    marginMultiplier: 6,
    children: [ Media, ColorTool, AnnotationTools, Notifications() ]
  }),

  popupWindow({
    position: 'bottom',
    children: [ Indicators, Keyboard, /* Dock */ ]
  })
]
