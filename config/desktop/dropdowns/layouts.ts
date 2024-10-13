import { Menu, MenuItemLabel as Item } from 'widgets'
import { sh, capitalize } from 'lib/utils'

import options from 'options'
const getLayouts = async () =>
  sh('hyprctl layouts')
    .then((out: string) => out.split(/\n/))
    .catch(logError)

const layouts = await getLayouts()

export default (widget) =>
  Menu(
    widget,
    layouts.map((layout: string) =>
      Item(capitalize(layout), () => options.hyprland.layout.value = layout),
    ),
  )
