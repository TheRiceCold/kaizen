import { type TrayItem } from 'types/service/systemtray'
import BarButton from '../../BarButton'

const { Gdk } = imports.gi

export default (item: TrayItem) => BarButton({
  className: 'tray-item',
  child: Widget.Icon({ icon: item.bind('icon') }),
  tooltipMarkup: item.bind('tooltip_markup'),
  setup: self => {
    const menu = item.menu
    if (!menu) return

    const id = item.menu?.connect('popped-up', () => {
      self.toggleClassName('active')
      menu.connect('notify::visible', () => {
        self.toggleClassName('active', menu.visible)
      })
      menu.disconnect(id!)
    })

    if (id) self.connect('destroy', () => item.menu?.disconnect(id))
  },

  onPrimaryClick: btn => item.menu?.popup_at_widget(btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null),
  onSecondaryClick: btn => item.menu?.popup_at_widget(btn, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null),
})
