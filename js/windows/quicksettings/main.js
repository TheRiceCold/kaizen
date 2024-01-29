import { PopupWindow } from '../../misc/main.js'
import { StackState } from '../../services/main.js'

import QuickSettings from './QuickSettings.js'

const QSState = new StackState('notifications')

export default PopupWindow({
  name: 'quicksettings',
  child: QuickSettings(QSState),
  anchor: ['right', 'top' ],
})
