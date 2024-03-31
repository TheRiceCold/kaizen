import wallpaper from 'service/wallpaper'

export default () => Widget.Box(
  { className: 'row wallpaper' },
  Widget.Box(
    { vertical: true },
    Widget.Label({
      xalign: 0,
      vpack: 'start',
      label: 'Wallpaper',
      className: 'row-title',
    }),
    Widget.Button({
      label: 'Random',
      onClicked: wallpaper.random,
    }),
    Widget.FileChooserButton({
      onFileSet: ({ uri }) => wallpaper.set(uri!.replace('file://', '')),
    }),
  ),
  Widget.Box({ hexpand: true }),
  Widget.Box({
    className: 'preview',
    css: wallpaper.bind('wallpaper').as((wp: string) => `
      min-height: 120px;
      min-width: 200px;
      background-image: url('${wp}');
      background-size: cover;
    `),
  }),
)
