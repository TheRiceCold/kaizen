import Ask from './ask'
import Calendar from './calendar'
import QuickSettings from './quicksettings'

type TDirection = 'left' | 'right'

const Sidemenu = (dir: TDirection, ...children) => Widget.Window({
  layer: 'overlay',
  name: `side${dir}`,
  anchor: ['top', dir],
  className: `side${dir}`,
  keymode: (dir === 'left') ? 'on-demand' : 'none',
  child: Widget.Box({ children, vertical: true, css: 'padding: 2px;' })
})

export default [
  Sidemenu('left', Ask),
  Sidemenu('right', Calendar, QuickSettings),
]
