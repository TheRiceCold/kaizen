import PopupWindow from '../PopupWindow'
import Content from './Content'
import options from 'options'

const { bar, datemenu } = options
const pos = bar.position.bind()

const layout = Utils.derive(
  [ bar.position, datemenu.position ],
  (bar, dm) => `${bar}-${dm}` as const,
)

const DateMenu = PopupWindow({
  name: 'datemenu',
  child: Content,
  layout: layout.value,
  exclusivity: 'exclusive',
  transition: pos.as(pos => pos === 'top' ? 'slide_down' : 'slide_up'),
})

export function setupDateMenu() {
  App.addWindow(DateMenu)
  layout.connect('changed', () => {
    App.removeWindow('datemenu')
    App.addWindow(DateMenu)
  })
}
