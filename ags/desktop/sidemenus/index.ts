import Ask from './ask'
import DateMenu from './datemenu'
import QuickSettings from './quicksettings'

type TDirection = 'left' | 'right'

const Sidemenu = (dir: TDirection, ...children) => Widget.Window({
  layer: 'overlay',
  name: `side${dir}`,
  anchor: ['top', dir],
  className: `side${dir}`,
  child: Widget.Box({
    children,
    vertical: true,
    css: 'padding: 2px;',
  })
})

export default [
  Sidemenu('left', Ask),
  Sidemenu('right', QuickSettings, DateMenu),
]
