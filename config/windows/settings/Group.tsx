import { Gtk } from 'astal/gtk3'
import icons from 'data/icons'

export default({ title, children }: { title?: string }) => (
  <box vertical className='group'>
    <box>
      <label
        label={title || ''}
        valign={Gtk.Align.END}
        className='group-title'
      />
      {title ? (
        <button
          hexpand
          halign={Gtk.Align.END}
          className='group-reset'
          child={<icon icon={icons.ui.refresh} />}
        />
      ) : <box />}
    </box>
    <box vertical>{children}</box>
  </box>
)
