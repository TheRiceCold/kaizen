import options from 'options'
import icons from 'data/icons'

const ChangeButtonRevealer = Widget.Revealer({}, Widget.Icon(icons.ui.camera))

const Image = Widget.Overlay({
  child: Widget.Box({
    className: 'image',
    css: options.avatar.bind().as(img => `
      min-width: 125px;
      min-height: 125px;
      background-size: cover;
      background-image: url('${img}');`),
  }),
  overlays: [
    ChangeButtonRevealer,
    Widget.FileChooserButton({
      className: 'file-choose',
      onFileSet({ uri }) {
        options.avatar.value = uri!.replace('file://', '') as T
      }
    })
  ],
})

export default Widget.Box(
  { className: 'avatar' },
  Widget.EventBox({
    vpack: 'end',
    hpack: 'start',
    cursor: 'pointer',
    className: 'container',
    onHover() { ChangeButtonRevealer.revealChild = true },
    onHoverLost() { ChangeButtonRevealer.revealChild = false },
  }, Image)
)
