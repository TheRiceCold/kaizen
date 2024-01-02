import { Widget } from '../../imports.js'

import StartWidget from './StartWidget.js'
import Workspaces from './modules/Workspaces.js'
import EndWidget from './EndWidget.js'

const Content = Widget.CenterBox({
  className: 'topbar',
  startWidget: StartWidget,
  centerWidget: Workspaces,
  endWidget: EndWidget,
})

export default Widget.Window({
  name: 'bar',
  child: Content,
  layer: 'overlay',
  exclusivity: 'ignore',
  anchor: ['top', 'left', 'right'],
})
