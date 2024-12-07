import { Gdk, Gtk } from 'astal/gtk3'
import { ButtonProps } from 'astal/gtk3/widget'

import options from 'options'
import { layoutsMenu, windowMenu } from 'widgets'
import { focusedClient, focusedWorkspace } from 'lib/utils/hyprland'

const substitutes = options.bar.clientClassSubs.get()

export default () => (
  <box>
    {/* Layout */}
    <button
      label='dwindle'
      cursor='pointer'
      onClickRelease={(self: ButtonProps) => {
        layoutsMenu.show_all()
        layoutsMenu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)}
      }
    />

    {/* Workspace */}
    <button
      className='workspace-button'
      label={focusedWorkspace.as(ws => `Workspace ${ws.id}`)}
    />

    {/* Window Client */}
    <stack
      visible={focusedClient.as(Boolean)}
      transitionDuration={250}
      transitionType={Gtk.StackTransitionType.SLIDE_LEFT_RIGHT}
      visibleChildName={focusedWorkspace.as(focused => String(focused.id))}
    >
      {new Array(options.numberOfWorkspace.get()).fill(null).map((_, i) => (
        <button
          name={String(i)}
          className='client-button'
          label={focusedClient.as((client) => {
            if (client === null) return ''
            if (client.class === null) return ''
            const sub = substitutes.find(s => s.startsWith(`${client.class}:`))
            return sub ? sub.split(':')[1] : client.class
          })}
          onClickRelease={(self: ButtonProps) => {
            windowMenu.show_all()
            windowMenu.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)}
          }
        />
      ))}
    </stack>
  </box>
)
