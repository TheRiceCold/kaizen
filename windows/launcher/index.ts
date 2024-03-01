import PopupWindow from '../PopupWindow'
import Sites from './Sites'
import Weather from './Weather'
import Launcher from './Launcher'
import options from 'options'

const { bar, launcher } = options

const layout = Utils.derive(
  [bar.position, launcher.position],
  (bar, launcher) => `${bar}-${launcher}` as const
)

const Content = Widget.Box({
  className: 'launcher',
  homogeneous: false,
  children: [
    Launcher(),
    Widget.Box({
      vertical: true,
      homogeneous: false,
      className: 'launcher-right',
      children: [ Weather(), Sites ]
    })
  ]
})

export default PopupWindow({
  child: Content,
  name: 'launcher',
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up')
})
