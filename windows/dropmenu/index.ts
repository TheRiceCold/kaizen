import PopupWindow from '../PopupWindow'
import DropMenu from './DropMenu'
import options from 'options'

const { bar, dropmenu } = options
const layout = Utils.derive(
  [bar.position, dropmenu.position],
  (bar, menu) => `${bar}-${menu}` as const
)

const Window = PopupWindow({
  child: DropMenu,
  name: 'dropmenu',
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up')
})

export function setupDropMenu() {
  App.addWindow(Window)
  layout.connect('changed', () => {
    App.removeWindow('dropmenu')
    App.addWindow(Window)
  })
}
