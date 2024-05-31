import { type TrayItem } from 'types/service/systemtray'
import BarButton from '../BarButton'
import options from 'options'

const { Gdk } = imports.gi
const { ignore } = options.bar.tray
const systemtray = await Service.import('systemtray')

const Item = (item: TrayItem) => BarButton({
  className: 'tray-item',
  tooltipMarkup: item.bind('tooltip_markup'),
  child: Widget.Icon({ icon: item.bind('icon') }),
  attribute: {
    openMenu: self => item.menu?.popup_at_widget(
      self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
  },
  onPrimaryClick: self => self.attribute.openMenu(self),
  onSecondaryClick: self => self.attribute.openMenu(self),
  setup(self) {
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
  items => items.filter(({ id }) => !ignore.value.includes(id)).map(Item)
)
