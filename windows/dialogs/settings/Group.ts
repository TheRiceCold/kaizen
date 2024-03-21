import icons from 'data/icons'
import Row from './Row'

export default (title: string, ...rows: ReturnType<typeof Row<any>>[]) => Widget.Box(
  { className: 'group', vertical: true },
  Widget.Box([
    Widget.Label({
      vpack: 'end',
      label: title,
      hpack: 'start',
      className: 'group-title',
      setup: w => Utils.idle(() => w.visible = !!title),
    }),
    title ? Widget.Button({
      hpack: 'end',
      hexpand: true,
      className: 'group-reset',
      child: Widget.Icon(icons.ui.refresh),
      sensitive: Utils.merge(
        rows.map(({ attribute: { opt } }) => opt.bind().as(v => v !== opt.initial)),
        (...values) => values.some(b => b),
      ),
      onClicked: () => rows.forEach(row => row.attribute.opt.reset()),
    }) : Widget.Box(),
  ]),
  Widget.Box({ vertical: true, children: rows }),
)
