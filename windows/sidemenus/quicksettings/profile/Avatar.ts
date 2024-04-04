import options from 'options'
import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

const { image, size } = options.sideright.profile.avatar

const ChangeButtonRevealer = Widget.Revealer({ child: Widget.Icon(icons.ui.camera) })

export default Widget.EventBox({
  setup: setupCursorHover,
  child: Widget.Overlay({
    className: 'avatar',
    overlays: [ 
      ChangeButtonRevealer, 
      Widget.FileChooserButton({ 
        className: 'file-choose',
        onFileSet: ({ uri }) => { 
          image.value = uri!.replace('file://', '') as T
        }
      }) 
    ],
    child: Widget.Box({
      css: Utils.merge(
        [ image.bind(), size.bind() ], (img: string, size: number) => `
        min-width: ${size}px;
        min-height: ${size}px;
        background-image: url('${img}');
        background-size: cover;`),
    }),
  }),
  onHover: () => ChangeButtonRevealer.revealChild = true,
  onHoverLost: () => ChangeButtonRevealer.revealChild = false,
})
