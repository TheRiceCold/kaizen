import options from 'options'
import DateMenu from './datemenu'
import QuickSettings from './quicksettings'

const pos = options.bar.position.bind()

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
