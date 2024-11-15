import wallpaper from 'service/wallpaper'
import { ButtonLabel, HomoBox, VBox } from 'widgets'

const { Box, Label, FileChooserButton } = Widget

export default HomoBox({ className: 'wallpaper' },
  VBox({ hpack: 'start' },
    Label({
      xalign: 0,
      vpack: 'start',
      label: 'Wallpaper',
      className: 'row-title',
    }),
    Box([
      FileChooserButton({
        onFileSet({ uri }) {
          wallpaper.set(uri!.replace('file://', ''))
        },
      }),
      ButtonLabel('Random', wallpaper.random),
    ])
  ),
  Box({ hpack: 'end', className: 'preview' })
    .bind('css', wallpaper, 'wallpaper', (wp: string) => `
      min-height: 80px;
      min-width: 140px;
      background: url('${wp}');
      background-size: contain, cover;
    `),
)
