import AiTools from './ai-tools'
import DateMenu from './datemenu'
import QuickSettings from './quicksettings'

type TDirection = 'left' | 'right'

const Sidemenu = (dir: TDirection, ...children) => Widget.Window({
  name: `side${dir}`,
  anchor: ['top', dir],
  className: `side${dir}`,
  keymode: 'on-demand',
  child: Widget.Box({
    children,
    vertical: true,
    css: 'padding: 2px;',
  })
})

export default [
  Sidemenu('left', AiTools),
  Sidemenu('right', QuickSettings, DateMenu),
]
