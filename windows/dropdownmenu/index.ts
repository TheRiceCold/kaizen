import PopupWindow from '../PopupWindow'
import Menu from './Menu'
import options from 'options'

const { bar, quicksettings } = options
const layout = Utils.derive(
  [bar.position, quicksettings.position],
  (bar, qs) => `${bar}-${qs}` as const
)

const Content = PopupWindow({
  child: Menu,
  name: 'menu',
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up')
})

export function setupMenu() {
  App.addWindow(Content)
  layout.connect('changed', () => {
    App.removeWindow('menu')
    App.addWindow(Content)
  })
}
