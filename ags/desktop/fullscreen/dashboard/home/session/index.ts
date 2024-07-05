import powermenu, { type Action } from 'service/powermenu'

import icons from 'data/icons'
import { sh, capitalize } from 'lib/utils'

const SysButton = (action: Action) => Widget.Button({
  cursor: 'pointer',
  onClicked() {
    if (action === 'lock') sh('kaizen-lock')
    else powermenu.action(action)
  },
  tooltipText: action === 'logout' ? 'Log Out' : capitalize(action),
  child: Widget.Box({ vertical: true }, Widget.Icon(icons.powermenu[action])),
})

export default Widget.Scrollable({
  hscroll: 'never',
  vscroll: 'automatic',
  className: 'session',
  child: Widget.Box(
    { vertical: true },
    SysButton('lock'),
    SysButton('sleep'),
    SysButton('logout'),
    SysButton('reboot'),
    SysButton('shutdown'),
  )
})
