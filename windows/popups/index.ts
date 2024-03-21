import Media from './media'
// import Indicators from './indicators'
import Notifications from './notifications'

import options from 'options'

export default [
  Widget.Window({
    name: `popups`,
    anchor: ['top'],
    className: 'popups',
    exclusivity: 'ignore',
    child: Widget.Box({
      vertical: true,
      children: [ Media, Notifications(), /* Indicators */ ],
      css: `padding: 2px; margin-top: ${options.theme.spacing * 3.5}px;`,
    }),
  })
]
