import wallpaper from 'service/wallpaper'

export default Widget.Box(
  { className: 'wallpaper', homogeneous: true },
  Widget.Box(
    { vertical: true, hpack: 'start' },
    Widget.Label({
      xalign: 0,
      vpack: 'start',
      label: 'Wallpaper',
      className: 'row-title',
    }),
    Widget.Box([
      Widget.FileChooserButton({
        onFileSet({uri}) {
          wallpaper.set(uri!.replace('file://', ''))
        },
      }),
      Widget.Button({
        label: 'Random',
        cursor: 'pointer',
        onClicked: wallpaper.random
      }),
    ])
  ),
  Widget.Box({
    hpack: 'end',
    className: 'preview',
    css: wallpaper.bind('wallpaper').as((wp: string) => `
      min-height: 80px;
      min-width: 140px;
      background: url('${wp}');
      background-size: contain, cover;
    `),
  }),
)
