import StartWidget from './StartWidget.js'
import CenterWidget from './CenterWidget.js'
import EndWidget from './EndWidget.js'
import { options } from '../../constants/main.js'

export default Widget.Window({
  name: 'bar',
  exclusivity: 'exclusive',
  anchor: options.bar.position.bind('value').transform(pos => ([
    pos, 'left', 'right',
  ])),
  child: Widget.CenterBox({
    className: 'topbar',
    startWidget: StartWidget,
    centerWidget: CenterWidget,
    endWidget: EndWidget,
  }),
})
