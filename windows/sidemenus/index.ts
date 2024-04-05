import Apis from './apis'
import DateMenu from './datemenu'
import QuickSettings from './quicksettings'

const left = Widget.Window({
  name: `sideleft`,
  className: 'sideleft',
  anchor: ['top', 'left'],
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ Apis ]
  }),
})

const right = Widget.Window({
  name: `sideright`,
  className: 'sideright',
  anchor: ['top', 'right'],
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ QuickSettings, DateMenu ]
  }),
})

export default [ right ]
