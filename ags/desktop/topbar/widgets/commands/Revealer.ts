import { type RevealerProps } from 'types/widgets/revealer'
import { type ButtonProps } from 'types/widgets/button'

import BarButton from '../../BarButton'

import icons from 'data/icons'
import options from 'options'

export default (dir: string, buttons: ButtonProps[]) => {
  const Revealer = Widget.Revealer({
    transition: `slide_${dir}`,
    child: Widget.Box(buttons.map(BarButton))
  })

  function ArrowIcon(dir: 'left' | 'right', revealer: RevealerProps) {
    let deg = 0
    const Icon = Widget.Icon({ icon: icons.ui.arrow[dir] })

    function animate() {
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
      className: 'arrow-button',
      onClicked() {
        animate()
        revealer.revealChild = !revealer.revealChild
      },
    })
  }

  return Widget.Box([
    dir === 'left' ? ArrowIcon(dir, Revealer) : Widget.Separator(),
    Revealer,
    dir !== 'right' ? Widget.Separator() : ArrowIcon(dir, Revealer)
  ])
}
