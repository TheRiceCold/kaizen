import ArrowIcon from './ArrowIcon'
import BarButton from 'windows/topbar/BarButton'

export type TRule = {
  name: string
  exec?: string
  dispatch?: string
}

export default (dir, commands) => {
  const Revealer = Widget.Revealer({
    transition: `slide_${dir}`,
    child: Widget.Box(commands.map(BarButton))
  })

  return Widget.Box([
    dir === 'left' ? ArrowIcon(dir, Revealer) : Widget.Separator(),
    Revealer,
    dir !== 'right' ? Widget.Separator() : ArrowIcon(dir, Revealer)
  ])
}
