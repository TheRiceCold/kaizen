import options from 'options'
import Profile from './profile'
import Utilities from './utilities'
import DateWeather from './dateweather'

const pos = options.bar.position.bind()

const right = Widget.Window({
  name: `sideright`,
  className: 'sideright',
  anchor: ['top', 'right'],
  child: Widget.Box({
    vertical: true,
    css: 'padding: 2px;',
    children: [ Profile, Utilities, DateWeather ]
  }),
})

export default [ right ]
