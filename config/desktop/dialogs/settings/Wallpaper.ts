import wallpaper from 'service/wallpaper'
import { ButtonLabel, VBox } from 'widgets'

export default Widget.Box(
  { className: 'wallpaper', homogeneous: true },
  VBox(
    { hpack: 'start' },
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
      ButtonLabel('Random', wallpaper.random),
    ])
  ),
  Widget.Box({ hpack: 'end', className: 'preview' })
    .bind('css', wallpaper, 'wallpaper', (wp: string) => `
      min-height: 80px;
      min-width: 140px;
      background: url('${wp}');
      background-size: contain, cover;
    `),
)
