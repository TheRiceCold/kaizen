import Media from './media'
import Keyboard from './keyboard'
import ColorTool from './color-tool'
import Indicators from './indicator'
import Notifications from './notifications'
import AnnotationTools from './annotation-tools'
import { showWidget } from 'lib/variables'

const popupWindow = (position: 'top' | 'bottom', ...children) => Widget.Window({
  layer: 'overlay',
  anchor: [position],
  exclusivity: 'ignore',
  name: `${position}-popups`,
  className: `${position}-popups`,
  child: Widget.Box({
    children,
    vertical: true,
    css: 'padding: 2px;',
  }),
  margins: showWidget.indicator.bind()
    .as((shown: boolean) => shown && (position === 'top') ? [36] : [0]),
})

export default [
  popupWindow('top', AnnotationTools, ColorTool, Media, Notifications()),
  popupWindow('bottom', Indicators, Keyboard),
]
