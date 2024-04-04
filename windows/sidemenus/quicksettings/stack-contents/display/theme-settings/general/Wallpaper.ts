import wallpaper from 'service/wallpaper'
import { setupCursorHover } from 'misc/cursorhover'

export default () => Widget.Box(
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
        onFileSet: ({ uri }) => wallpaper.set(uri!.replace('file://', '')),
      }),
      Widget.Button({ 
        label: 'Random', 
        setup: setupCursorHover,
        onClicked: wallpaper.random 
      }),
    ])
  ),
  Widget.Box({ hexpand: true }),
  Widget.Box({
    className: 'preview',
    css: wallpaper.bind('wallpaper').as((wp: string) => `
      min-height: 75px;
      min-width: 135px;
      background: url('${wp}');
      background-size: contain, cover;
    `),
  }),
)
