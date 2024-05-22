import { sh } from 'lib/utils'
import LabelStack from './LabelStack'
import BarButton from '../../BarButton'

const dispatch = (arg: string | number) => sh(`hyprctl dispatch workspace ${arg}`)

export default Widget.Box([
  BarButton({
    window: 'overview',
    label: 'Workspace',
    className: 'workspaces',
    onScrollUp() { dispatch('m+1') },
    onScrollDown() { dispatch('m-1') },
    onClicked() { App.toggleWindow('overview') },
  }),
  LabelStack
])
