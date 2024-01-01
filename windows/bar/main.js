import { Widget } from '../../imports.js'

import StartWidget from './StartWidget.js'
import Workspaces from './modules/Workspaces.js'
import EndWidget from './EndWidget.js'

export default () => Widget.Window({
  name: 'bar',
  layer: 'overlay',
  exclusivity: 'ignore',
  anchor: ['top', 'left', 'right'],
  child: Widget.CenterBox({
    className: 'topbar',
    startWidget: StartWidget,
    centerWidget: Workspaces,
    endWidget: EndWidget,
  })
})
