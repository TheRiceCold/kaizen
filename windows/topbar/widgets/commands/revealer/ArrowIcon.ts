import options from 'options'
import icons from 'data/icons'
import BarButton from 'windows/topbar/BarButton'

export default (dir, revealer) => {
  let deg = 0
  const Icon = Widget.Icon({ icon: icons.ui.arrow[dir] })
  const animate = () => {
    const t = options.transition / 20
    const step = revealer.revealChild ? 10 : -10
    for (let i = 0; i < 18; ++i)
    Utils.timeout(t * i, () => {
      deg += step
      Icon.setCss(`-gtk-icon-transform: rotate(${deg}deg);`)
    })
  }

  return BarButton({
    child: Icon,
    onClicked: () => {
      animate()
      revealer.revealChild = !revealer.revealChild
    },
  })
}
