import { Widget } from '../../../imports.js'
import { StackState } from '../../../services/main.js'
import StackButtons from './buttons/main.js'
import { 
  NotificationStack 
} from './contents/main.js'

import icons from '../../../icons.js'

const state = new StackState('notifications')

const Header = Widget.Box({
  hpack: 'center',
  homogeneous: true,
  children: StackButtons(state),
  className: 'sidebar-togglesbox spacing-h-10',
})

const Stack = Widget.Stack({
  transition: 'slide_left_right',
  visible_child_name: state.bind(),
  items: [
    NotificationStack,
  ]
})

export default () => {
  state.items = Stack.items.map(item => item[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true,
      children: [ Header, Stack ]
    })
  })
}
