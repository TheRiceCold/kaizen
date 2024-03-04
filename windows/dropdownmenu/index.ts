import PopupWindow from '../PopupWindow'
import Content from './Menu'
import options from 'options'

const { bar, menu } = options
const layout = Utils.derive(
  [bar.position, menu.position],
  (bar, menu) => `${bar}-${menu}` as const
)

const MenuWindow = PopupWindow({
  child: Content,
  name: 'menu',
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up')
})

export function setupMenu() {
  App.addWindow(MenuWindow)
  layout.connect('changed', () => {
    App.removeWindow('menu')
    App.addWindow(MenuWindow)
  })
}
