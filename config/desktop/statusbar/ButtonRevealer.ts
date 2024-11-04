import { type ButtonProps } from 'types/widgets/button'
import { type RevealerProps } from 'types/widgets/revealer'

import BarButton from './BarButton'

import options from 'options'
import icons from 'data/icons'

export default (dir: string, buttons: ButtonProps[]) => {
  const Revealer = Widget.Revealer({
    transition: `slide_${dir}`,
    child: Widget.Box(buttons.map(BarButton))
  })

  function ArrowIcon(dir: 'left' | 'right', revealer: RevealerProps) {
    let deg = 0
    const Icon = Widget.Icon({ icon: icons.ui.arrow[dir] })

    function animate() {
      const t = options.transition.value / 20
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
    dir === 'left' && ArrowIcon(dir, Revealer),
    Revealer,
    dir === 'right' && ArrowIcon(dir, Revealer)
  ])
}
