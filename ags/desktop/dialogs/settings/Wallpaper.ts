import wallpaper from 'service/wallpaper'

export default Widget.Box(
  { className: 'wallpaper' },
  Widget.Box(
    { vertical: true },
    Widget.Label({
      xalign: 0,
      vpack: 'start',
      label: 'Wallpaper',
      className: 'row-title',
    }),
    Widget.Box([
      Widget.FileChooserButton({
        onFileSet({ uri }) {
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
  Widget.Box({ hexpand: true }),
  Widget.Box({
    className: 'preview',
    css: wallpaper.bind('wallpaper').as((wp: string) => `
      min-height: 80px;
      min-width: 140px;
      background: url('${wp}');
      background-size: contain, cover;
    `),
  }),
)
