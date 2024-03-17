import { sh } from 'lib/utils'
import ArrowIcon from '../../ArrowIcon'
import BarButton from '../../BarButton'

type TRule = {
  name: string
  exec?: string
  dispatch?: string
}

const direction = 'right'
const rules: TRule[] = [
  { name: 'Zoom', exec: 'pypr zoom' },
  { name: 'Quit', dispatch: 'killactive'},
  { name: 'Pin', dispatch: 'pin' },
  { name: 'Fullscreen', dispatch: 'fullscreen'},
  { name: 'Float', dispatch: 'togglefloating' },
]

const Button = (rule: TRule) => BarButton({
  label: rule.name,
  onClicked: () => {
    if ('exec' in rule)
      sh(rule.exec ?? '')
    else
      sh(`hyprctl dispatch ${rule.dispatch}`)
  }
})

const Revealer = Widget.Revealer({
  transition: `slide_${direction}`,
  child: Widget.Box([ /* TODO: Separator */ ].concat(rules.map(Button)))
})

const Icon = ArrowIcon({ direction, revealer: Revealer })

export default Widget.Box([ Widget.Separator(), Revealer, Icon ])
