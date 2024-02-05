import { PopupWindow } from '../../misc/main.js'
import { StackState } from '../../services/main.js'
import QuickSettings from './QuickSettings.js'

import { options } from '../../constants/main.js'

const QSState = new StackState('notifications')

export default PopupWindow({
  name: 'quicksettings',
  child: QuickSettings(QSState),
  setup: self => self.hook(options.bar.position, () => {
    self.anchor = ['right', options.bar.position.value]
    if (options.bar.position.value === 'top')
      self.transition = 'slide_down'

    if (options.bar.position.value === 'bottom')
      self.transition = 'slide_up'
  })
})
