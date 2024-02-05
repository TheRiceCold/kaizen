import { PopupWindow } from '../../misc/main.js'
import { options } from '../../constants/main.js';

import Content from './content/main.js'

export default PopupWindow({
  child: Content,
  name: 'dashboard',
  setup: self => self.hook(options.bar.position, () => {
    self.anchor = [options.bar.position.value];
    if (options.bar.position.value === 'top')
      self.transition = 'slide_down'

    if (options.bar.position.value === 'bottom')
      self.transition = 'slide_up'
  }),
})
