import options from 'options'
import { sh } from 'lib/utils'
import LabelStack from './LabelStack'
import BarButton from '../../BarButton'

const dispatch = (arg: string | number) => sh(`hyprctl dispatch workspace ${arg}`)

export default () => Widget.Box([
  BarButton({
    window: 'overview',
    className: 'workspaces',
    label: options.bar.workspaces.label.value,
    onScrollUp: () => dispatch('m+1'),
    onScrollDown: () => dispatch('m-1'),
    onClicked: () => App.toggleWindow('overview'),
  }),
  LabelStack
])
