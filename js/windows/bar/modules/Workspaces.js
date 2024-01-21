import { Widget, Hyprland } from '../../../imports.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const { 
  sendMessage,
  active: {workspace} 
} = Hyprland

const WorkspaceButton = i => Widget.EventBox({
  className: 'workspace-button',
  setup: btn => setupCursorHover(btn),
  child: Widget.Label({ label: `${i}`, className: 'button-label' }),
  onPrimaryClickRelease: () => sendMessage(`dispatch workspace ${i}`),
}).hook(workspace, btn => btn.toggleClassName('active', workspace.id === i))

export default Widget.EventBox({
  attribute: { clicked: false },
  className: 'workspaces-background',
  child: Widget.Box({
    className: 'workspaces',
    children: Array.from({ length: 9 }, (_, i) => i + 1).map(WorkspaceButton),
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
