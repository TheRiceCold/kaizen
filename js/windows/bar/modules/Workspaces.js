import { Widget, Hyprland, Utils } from '../../../imports.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'
import { options, utils } from '../../../constants/main.js'

const { active: {workspace} } = Hyprland

const ws = options.workspaces.value
const dispatch = arg => Utils.execAsync(`hyprctl dispatch workspace ${arg}`)

const WorkspaceButton = i => Widget.Button({
  setup: setupCursorHover,
  onClicked: () => dispatch(i),
  className: 'workspace-button',
  child: Widget.Label({ label: `${i}`, className: 'button-label' }),
}).hook(workspace, btn => btn.toggleClassName('active', workspace.id === i))

export default Widget.Box({
  className: 'workspaces-background',
  child: Widget.Box({
    className: 'workspaces',
    children: utils.range(ws || 20).map(WorkspaceButton),
  }).hook(Hyprland, ({ children }) => {
    children.forEach((item, i) => {
      const ws = Hyprland.getWorkspace(i + 1)
      const ws_before = Hyprland.getWorkspace(i)
      const ws_after = Hyprland.getWorkspace(i + 2)

      item.toggleClassName('occupied', ws?.windows > 0)
      item.toggleClassName('occupied-right', !ws_after || ws_after?.windows <= 0)
      item.toggleClassName('occupied-left', !ws_before || ws_before?.windows <= 0)
    })
  }, 'notify::workspaces')
})
