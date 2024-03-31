import Avatar from './Avatar'
import ClockBox from './ClockBox'
import SystemProgress from './SystemProgress'

import { cpu, ram } from 'lib/variables'

export default Widget.Box({ 
  vpack: 'center',
  className: 'profile', 
  children: [ 
    Avatar, 
    ClockBox, 
    SystemProgress([
      { type: ram, label: 'RAM', icon: '󰑭' },
      { type: cpu, label: 'CPU', icon: '' },
    ]),
  ]
})
