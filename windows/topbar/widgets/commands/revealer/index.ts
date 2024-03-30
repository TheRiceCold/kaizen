import { type ButtonProps } from 'types/widgets/button'

import ArrowIcon from './ArrowIcon'
import BarButton from 'windows/topbar/BarButton'

export default (dir: string, buttons: ButtonProps[]) => {
  const Revealer = Widget.Revealer({
    transition: `slide_${dir}`,
    child: Widget.Box(buttons.map(BarButton))
  })

  return Widget.Box([
    dir === 'left' ? ArrowIcon(dir, Revealer) : Widget.Separator(),
    Revealer,
    dir !== 'right' ? Widget.Separator() : ArrowIcon(dir, Revealer)
  ])
}
