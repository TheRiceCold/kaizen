import Avatar from './Avatar'
import ClockBox from './ClockBox'
import SystemProgress from './SystemProgress'

import icons from 'data/icons'
import { cpu, ram } from 'lib/variables'

export default Widget.Box(
  { vpack: 'center', className: 'profile' },
  Avatar, ClockBox,
  SystemProgress([
    { type: ram, label: 'RAM', icon: icons.system.ram },
    { type: cpu, label: 'CPU', icon: icons.system.cpu },
  ]),
)
