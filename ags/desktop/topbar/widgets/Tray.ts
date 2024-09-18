import { type ButtonProps } from 'types/widgets/button'
import { type TrayItem } from 'types/service/systemtray'
import BarButton from '../BarButton'

const { Gdk } = imports.gi
const systemtray = await Service.import('systemtray')

const Item = (item: TrayItem) => BarButton({
  className: 'tray-item',
  tooltipMarkup: item.bind('tooltip_markup'),
  child: Widget.Icon().bind('icon', item, 'icon'),
  attribute: {
    openMenu(self: ButtonProps) {
      item.menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
    }
  },
  onPrimaryClick(self: ButtonProps) {
    self.attribute.openMenu(self)
  },
  onSecondaryClick(self: ButtonProps) {
    self.attribute.openMenu(self)
  },
  setup(self: ButtonProps) {
    const menu = item.menu
    if (!menu) return

    const id = item.menu?.connect('popped-up', () => {
      self.toggleClassName('active')
      menu.connect('notify::visible', () => self.toggleClassName('active', menu.visible))
      menu.disconnect(id!)
    })

    if (id) self.connect('destroy', () => item.menu?.disconnect(id))
  },
})

export default Widget.Box().bind(
  'children', systemtray, 'items',
  items => items.filter(({ id }) => !options.topbar.tray.ignore.value.includes(id)).map(Item)
)
