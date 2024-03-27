import PopupWindow from '../PopupWindow'
import Bookmarks from './Bookmarks'
import AppLauncher from './applauncher'
import options from 'options'

const { bar, launcher } = options

const layout = Utils.derive(
  [bar.position, launcher.position],
  (bar, launcher) => `${bar}-${launcher}` as const
)

const Content = Widget.Box({
  className: 'launcher',
  children: [
    AppLauncher(),
    Bookmarks,
  ]
})

export default PopupWindow({
  child: Content,
  name: 'launcher',
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up')
})
