import { Widget, SystemTray } from '../../../imports.js'
import PanelButton from './PanelButton.js'

const { Gdk } = imports.gi

const SysTrayItem = item => PanelButton({
  className: 'tray-item',
  content: Widget.Icon({ icon: item.bind('icon') }),
  tooltip_markup: item.bind('tooltip_markup'),
  setup: self => {
    const id = item.menu?.connect('popped-up', menu => {
      self.toggleClassName('active');
      menu.connect('notify::visible', menu => {
        self.toggleClassName('active', menu.visible)
      })
      menu.disconnect(id)
    })

    if (id)
      self.connect('destroy', () => item.menu?.disconnect(id))
  },

  onPrimaryClick: btn => item.menu?.popup_at_widget(
    btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null
  ),

  onSecondaryClick: btn => item.menu?.popup_at_widget(
    btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null
  ),
})

export default Widget.Box().bind(
  'children', 
  SystemTray, 
  'items', i => i.map(SysTrayItem)
)
