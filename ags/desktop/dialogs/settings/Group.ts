import icons from 'data/icons'

export default (title: string, ...items) => Widget.Box(
  { vertical: true, className: 'group' },
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
        items.map(({ attribute: { opt } }) => opt.bind().as(v => v !== opt.initial)),
        (...values) => values.some(b => b),
      ),
      onClicked() { items.forEach(row => row.attribute.opt.reset()) },
    }) : Widget.Box(),
  ]),
  Widget.Box({ vertical: true, children: items }),
)
