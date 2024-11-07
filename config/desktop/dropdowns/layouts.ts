import { Menu, MenuItemLabel as Item } from 'widgets'
import { hyprland, capitalize } from 'lib/utils'

import options from 'options'

const layouts = await hyprland.getLayouts()

export default (widget) =>
  Menu(
    widget,
    layouts.map((layout: string) =>
      Item(capitalize(layout), () => options.hyprland.layout.value = layout),
    ),
  )
