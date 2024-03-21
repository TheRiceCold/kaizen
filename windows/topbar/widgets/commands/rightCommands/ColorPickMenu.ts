import { type ButtonProps } from 'types/widgets/button'
import Colorpicker from 'service/colorpicker'
import Gdk from 'gi://Gdk'

const Menu = () => {
  const css = (color: string) => `
    * {
      background-color: ${color};
      color: transparent;
    }
    *:hover {
      color: white;
      text-shadow: 2px 2px 3px rgba(0,0,0,.8);
    }`

  return Widget.Menu({
    className: 'colorpicker',
    children: Colorpicker.bind('colors').as(c => c.map(color => Widget.MenuItem({
      css: css(color),
      child: Widget.Label(color),
      onActivate: () => Colorpicker.wlCopy(color),
    }))),
  })
}

export const openColorPickMenu = (self: ButtonProps) => {
  if (Colorpicker.colors.length === 0) return
  Menu().popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
}
