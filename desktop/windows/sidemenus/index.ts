import AiTools from './ai-tools'
import DateMenu from './datemenu'
import QuickSettings from './quicksettings'

const left = Widget.Window({
  name: 'sideleft',
  className: 'sideleft',
  anchor: ['top', 'left'],
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ AiTools ]
  }),
})

const right = Widget.Window({
  name: 'sideright',
  className: 'sideright',
  anchor: ['top', 'right'],
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ QuickSettings, DateMenu ]
  }),
})

export default [ left, right ]
