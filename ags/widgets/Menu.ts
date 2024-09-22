import { type MenuProps } from 'types/widgets/menu'
import { type MenuItemProps } from 'types/widgets/menuitem'

const { Gdk } = imports.gi
type MenuItemType = MenuItemProps & { subItems?: MenuItemProps[] }

const { Box, Icon, Label } = Widget

export const MenuItem = (props: MenuItemType) => Widget.MenuItem({
  cursor: 'pointer',
  setup(self: MenuItemProps) {
    if ('subItems' in props)
      self.submenu = Widget.Menu({ children: props.subItems })
  }, ...props
})

export const MenuItemLabel = (
  label: string,
  onActivate: typeof MenuItem[] | (() => void) = () => { },
  props: MenuItemType = {},
) => MenuItem({
  child: Label({ hpack: 'start', label }),
  setup(self: MenuItemType) {
    if (Array.isArray(onActivate))
      self.submenu = Widget.Menu({ children: onActivate })
    else
      self.onActivate = onActivate
  }, ...props,
})

export const MenuItemIconLabel = (
  icon: string,
  label: string,
  onActivate: () => void = () => { },
  props: MenuItemType = {},
) => MenuItem({
  child: Box([Icon(icon), Label(label)]),
  onActivate,
  ...props,
})

export const Menu = (
  widget,
  children: MenuItemType[],
  props: MenuProps & { type: 'button' | 'event' } = { type: 'button' }
) => {
  switch (props.type) {
    case 'event': delete props.type
      return Widget.Menu({ children, ...props }).popup_at_pointer(widget)
    case 'button': delete props.type
      return Widget.Menu({ children, ...props }).popup_at_widget(widget, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
    default:
      return
  }
}
