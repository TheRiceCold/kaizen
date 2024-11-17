import { bind } from 'astal'
import { Gtk } from 'astal/gtk3'
import Hyprland from 'gi://AstalHyprland'

const NUM_OF_WORKSPACES = 8
const hypr = Hyprland.get_default()
const focusedClient = bind(hypr, 'focusedClient')
const focusedWorkspace = bind(hypr, 'focusedWorkspace')

const WorkspaceClient = () => (
  <stack
    visible={focusedClient.as(Boolean)}
    transitionDuration={250}
    transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
    visibleChildName={focusedWorkspace.as(focused => String(focused.id))}
  >
    {focusedClient.as(client => Array(NUM_OF_WORKSPACES)
      .fill(1).map((_, i)=> (
        <button
          name={String(i)}
          className='client-button'
          label={bind(client, 'class').as(c => `: ${c}`)}
        />
      ))
    )}
  </stack>
)

export default () => (
  <box>
    <button
      label='dwindle'
      onClicked={() => {
        // TODO: Layouts Menu
      }}
    />
    <button
      className='workspace-button'
      label={focusedWorkspace.as(ws => `Workspace ${ws.id}`)}
    />
    <WorkspaceClient />
  </box>
)
