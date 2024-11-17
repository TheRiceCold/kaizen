import { App, Gdk } from 'astal/gtk3'
import { bind } from 'astal'

import Tray from 'gi://AstalTray'

const tray = Tray.get_default()

export default () => (
  <box>
    {bind(tray, 'items').as(items => items.map(item => {
      if (item.iconThemePath)
        App.add_icons(item.iconThemePath)

      const menu = item.create_menu()

      return (
        <button
          onDestroy={() => menu?.destroy()}
          tooltipMarkup={bind(item, 'tooltipMarkup')}
          onClickRelease={self => {
            menu?.popup_at_widget(self, Gdk.Gravity.SOUTH, Gdk.Gravity.NORTH, null)
          }}>
          <icon gIcon={bind(item, 'gicon')} />
        </button>
      )
    }))}
  </box>
)
