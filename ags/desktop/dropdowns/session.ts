import powermenu, { type Action } from 'service/powermenu'

import { Menu, MenuItemIconLabel as Item } from 'widgets'
import { sh, capitalize } from 'lib/utils'
import icons from 'data/icons'

const sessions = ['lock', 'sleep', 'reboot', 'logout', 'shutdown']

export default widget => Menu(widget, sessions.map((s: Action) => Item(
  icons.powermenu[s],
  (s === 'logout') ? 'Log Out' : capitalize(s),
  () => {
    if (s === 'lock') sh('kaizen-lock')
    else powermenu.action(s)
  })
))
