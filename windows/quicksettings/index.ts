import PopupWindow from '../PopupWindow'
import QuickSettings from './QuickSettings'
import options from 'options'

const { bar, quicksettings } = options
const layout = Utils.derive(
  [bar.position, quicksettings.position],
  (bar, qs) => `${bar}-${qs}` as const
)

const Content = PopupWindow({
  child: QuickSettings,
  layout: layout.value,
  name: 'quicksettings',
  exclusivity: 'exclusive',
  transition: bar.position.bind().as(pos => pos === 'top' ? 'slide_down' : 'slide_up')
})

export function setupQuickSettings() {
  App.addWindow(Content)
  layout.connect('changed', () => {
    App.removeWindow('quicksettings')
    App.addWindow(Content)
  })
}
