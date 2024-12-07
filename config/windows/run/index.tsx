import { Variable } from 'astal'
import { App, Astal, Gdk, Gtk } from 'astal/gtk3'
import { WindowProps, EntryProps } from 'astal/gtk3/widget'

import Apps from 'gi://AstalApps'

//import PopLauncher from 'services/poplauncher'

import AppList from './AppList'

import icons from 'data/icons'

const query = Variable('')
const apps = new Apps.Apps()
const appList = Variable([] as Apps.Application[])

// const popLauncher = PopLauncher.get_default()

export default () => (
  <window
    name='run'
    className='run'
    visible={false}
    application={App}
    anchor={
      Astal.WindowAnchor.TOP |
      Astal.WindowAnchor.LEFT |
      Astal.WindowAnchor.RIGHT |
      Astal.WindowAnchor.BOTTOM
    }
    layer={Astal.Layer.TOP}
    exclusive={Astal.Layer.IGNORE}
    keymode={Astal.Keymode.ON_DEMAND}
    setup={(self: WindowProps) => {
      self.connect('notify::visible', () => {
        if (!self.visible) { query.set(''); appList.set([]) }
      })
    }}
    onKeyPressEvent={(self: WindowProps, event: Gdk.Event) => {
      const win = App.get_window(self.name)
			if (event.get_keyval()[1] === Gdk.KEY_Escape && win?.visible)
        win.visible = false
    }}
  >
    <eventbox
      homogeneous
      canFocus={false}
      onClickRelease={() => App.toggle_window('run')}
    >
      <box vertical valign={Gtk.Align.START} halign={Gtk.Align.CENTER}>
        <entry
          primaryIconName={icons.ui.search}
          onActivate={() => { appList.get()[0].launch(); App.toggle_window('run') }}
          setup={(self: EntryProps) => self.connect('notify::text', () => query.set(self.text))}
        />
        <AppList query={query} apps={apps} list={appList} />
      </box>
    </eventbox>
  </window>
)
