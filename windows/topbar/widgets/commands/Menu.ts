import { type MenuItemProps } from 'types/widgets/menuitem'
import { type ButtonProps } from 'types/widgets/button'
import { setupCursorHover } from 'misc/cursorhover'
import Gdk from 'gi://Gdk'

export default (self: ButtonProps, commands: MenuItemProps[]) => {
  const menu = Widget.Menu({
    children: commands.map(({ label, ...props }) => Widget.MenuItem({
      setup: setupCursorHover,
      child: Widget.Label({ label, hpack: 'start' }),
      ...props
    }))
  })

  return menu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
}
