import { PopupWindow } from '../../misc/main.js'
import { StackState } from '../../services/main.js'

import QuickSettings from './QuickSettings.js'

const QSState = new StackState('notifications')

export default () => PopupWindow({
  focusable: true,
  name: 'quicksettings',
  child: QuickSettings(QSState),
  anchor: ['right', 'top', 'bottom'],
}).on('key-press-event', (_, event) => {
  const { Gdk } = imports.gi
  const keyval = event.get_keyval()[1]
  if (event.get_state()[1] != (Gdk.ModifierType.MOD1_MASK | Gdk.ModifierType.MOD2_MASK)) 
    return
  switch (keyval) {
    case Gdk.KEY_n: 
    case Gdk.KEY_Tab:
      QSState.next()
      break

    case Gdk.KEY_p:
      QSState.prev()
      break

    case Gdk.KEY_0: 
    case Gdk.KEY_KP_0:
      QSState.setIndex(0)
      break

    case Gdk.KEY_1: 
    case Gdk.KEY_KP_1:
      QSState.setIndex(1)
      break

    case Gdk.KEY_2: 
    case Gdk.KEY_KP_2:
      QSState.setIndex(2)
      break

    case Gdk.KEY_3: 
    case Gdk.KEY_KP_3:
      QSState.setIndex(3)
      break

    case Gdk.KEY_4: 
    case Gdk.KEY_KP_4:
      QSState.setIndex(4)
      break

    case Gdk.KEY_5: 
    case Gdk.KEY_KP_5:
      QSState.setIndex(5)
      break

    case Gdk.KEY_6: 
    case Gdk.KEY_KP_6:
      QSState.setIndex(6)
      break

    case Gdk.KEY_7: 
    case Gdk.KEY_KP_7:
      QSState.setIndex(7)
      break

    case Gdk.KEY_8: 
    case Gdk.KEY_KP_8:
      QSState.setIndex(8)
      break

    case Gdk.KEY_9: 
    case Gdk.KEY_KP_9:
      QSState.setIndex(9)
      break
  }
})
