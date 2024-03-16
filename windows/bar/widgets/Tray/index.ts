import options from 'options'
import icons from 'data/icons'
import Item from './Item'
import BarButton from '../../BarButton'

const { ignore, direction } = options.bar.tray
const systemtray = await Service.import('systemtray')

const Revealer = Widget.Revealer({
  revealChild: true,
  transition: `slide_${direction}`,
  child: Widget.Box().bind(
    'children', systemtray, 'items',
    i => i.filter(({ id }) => !ignore.value.includes(id)).map(Item))
})

const ArrowIcon = () => {
  let deg = 0
  const Icon = Widget.Icon({ icon: icons.ui.arrow[direction] })
  const animate = () => {
    const t = 200 / 20
    const step = Revealer.revealChild ? 10 : -10
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
      Revealer.revealChild = !Revealer.revealChild
    }
  })
}

const dir = direction.value
export default Widget.Box([
  dir === 'right' && Revealer,
  ArrowIcon(),
  dir === 'left' && Revealer,
])
