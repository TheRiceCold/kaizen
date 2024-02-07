import { PopupWindow } from '../../misc/main.js'
import Calendar from './Calendar.js'

import { options } from '../../constants/main.js'

export default PopupWindow({
  child: Calendar,
  name: 'calendar',
  setup: self => self.hook(options.bar.position, () => {
    self.anchor = [options.bar.position.value];
    if (options.bar.position.value === 'top')
      self.transition = 'slide_down'

    if (options.bar.position.value === 'bottom')
      self.transition = 'slide_up'
  }),
})
