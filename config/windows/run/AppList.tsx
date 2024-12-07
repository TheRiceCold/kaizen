import { Variable } from 'astal'
import { App, Gtk } from 'astal/gtk3'
import { BoxProps, RevealerProps } from 'astal/gtk3/widget'

import Apps from 'gi://AstalApps'

interface IProps {
  apps: Apps
  query: Variable<string>
  list: Variable<Apps.Application[]>
}

const MAX_ITEM = 8

function AppList({ query, apps, list }: IProps) {
  const setup = (self: BoxProps) => query.subscribe(text => {
    list.set(apps.fuzzy_query(text))
    self.children.reduce((i: number, item: RevealerProps) => {
      if (!text || i >= MAX_ITEM) {
        item.revealChild = false
        return i
      }
      if (list.get()[i].fuzzy_match(text)) {
        item.revealChild = true
        return ++i
      }
      item.revealChild = false
      return i
    }, 0)
  })

  return (
    <box vertical className='app-list' setup={setup}>
      {list(apps => apps.map(app => (
        <revealer>
          <button onClicked={() => { app.launch(); App.toggle_window('run') }}>
            <box>
              <icon className='icon' icon={app.icon_name} />
              <box vertical valign={Gtk.Align.CENTER}>
                <label xalign={0} className='title' label={app.name} />
                <label wrap xalign={0} maxWidthChars={40} label={app.description} />
              </box>
            </box>
          </button>
        </revealer>
      )))}
    </box>
  )
}

export default AppList
