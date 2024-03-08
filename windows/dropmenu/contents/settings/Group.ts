import Row from './Row'

export default <T>(title: string, ...rows: ReturnType<typeof Row<T>>[]) => Widget.Box({
  className: 'group',
  vertical: true,
  children: [
    Widget.Label({
      label: title,
      hpack: 'start',
      className: 'group-title',
      setup: w => Utils.idle(() => w.visible = !!title),
    }),
    Widget.Box({ vertical: true, children: rows }),
  ],
})
