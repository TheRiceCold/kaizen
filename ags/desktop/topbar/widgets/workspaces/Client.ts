import WindowMenu from './WindowMenu'
import BarButton from '../../BarButton'

import options from 'options'
import { capitalize } from 'lib/utils'

const { active } = await Service.import('hyprland')

export default (num: number) => Widget.Box({className: 'client'},
  Widget.Label().bind(
    'label', active.client, 'class',
    (c: string) => (c === '') ? `${num}:` : num+''
  ), BarButton({
    onClicked: WindowMenu,
    label: active.client.bind('class').as((c: string) => {
      const subs = options.workspaces.substitutes.value
      return capitalize((c in subs) ? subs[c] : c)
    }),
    visible: active.bind('client').as(({title, class: c}) => !!title && !!c),
  })
)
