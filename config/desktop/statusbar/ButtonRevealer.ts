import { type ButtonProps } from 'types/widgets/button'

import BarButton from './BarButton'

import options from 'options'
import icons from 'data/icons'

const { Box, Icon, Revealer } = Widget

export default (dir: 'left' | 'right', buttons: ButtonProps[]) => {
  const revealer = Revealer({
    transition: `slide_${dir}`,
    child: Box(buttons.map(BarButton))
  })

  function ArrowIcon() {
    let deg = 0
    const icon = Icon({ icon: icons.ui.arrow[dir] })

    function animate() {
      const t = options.transition.value / 20
      const step = revealer.revealChild ? 10 : -10
      for (let i = 0; i < 18; ++i)
        Utils.timeout(t * i, () => {
          deg += step
          icon.setCss(`-gtk-icon-transform: rotate(${deg}deg);`)
        })
    }

    return BarButton({
      child: icon,
      className: 'arrow-button',
      onClicked() {
        animate()
        revealer.revealChild = !revealer.revealChild
      },
    })
  }

  return Box([
    dir === 'left' && ArrowIcon(),
    revealer,
    dir === 'right' && ArrowIcon()
  ])
}
