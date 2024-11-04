import { VBox } from 'widgets'

import Ask from './ask'
import Calendar from './calendar'
import QuickSettings from './quicksettings'
import options from 'options'


type TDirection = 'left' | 'right'

const Sidemenu = (dir: TDirection, ...children) => Widget.Window({
  layer: 'overlay',
  name: `side${dir}`,
  className: `side${dir}`,
  keymode: dir === 'left' ? 'on-demand' : 'none',
  child: VBox({ children, css: 'padding: 2px;' }),
  anchor: options.statusbar.position.bind().as((p: 'top' | 'bottom') => [p, dir]),
})

export default [
  Sidemenu('left', Ask),
  Sidemenu('right', QuickSettings, Calendar),
]
