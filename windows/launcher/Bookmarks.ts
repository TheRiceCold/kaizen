import options from 'options'
import bookmarks from 'data/bookmarks'
import { sh } from 'lib/utils'

const { iconSize } = options.launcher

export default Widget.Box({
  vertical: true,
  className: 'bookmarks',
  children: [
    Widget.Label({
      hexpand: true,
      label: 'Bookmarks',
      className: 'header',
    }),
    Widget.Box({
      vertical: true,
      children: bookmarks.map(({ label, url, icon }) => Widget.Button({
        className: 'item',
        onClicked: () => sh(`firefox ${url} open=0`),
        child: Widget.Box([
          Widget.Icon({
            icon: `${icon}-symbolic`,
            size: Number(iconSize) * 0.5,
          }),
          Widget.Label({
            label,
            hpack: 'start',
            vpack: 'center',
            className: 'title',
          }),
        ])
      })),
    }),
  ]
})
