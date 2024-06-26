import options from 'options'
import icons from 'data/icons'

const ChangeButtonRevealer = Widget.Revealer({ child: Widget.Icon(icons.ui.camera) })

export default Widget.EventBox({
  cursor: 'pointer',
  child: Widget.Overlay({
    className: 'avatar',
    overlays: [
      ChangeButtonRevealer,
      Widget.FileChooserButton({
        className: 'file-choose',
        onFileSet({ uri }) {
          options.avatar.value = uri!.replace('file://', '') as T
        }
      })
    ],
    child: Widget.Box({
      css: Utils.merge([
        options.avatar.bind(),
        options.sideright.avatarSize.bind(),
      ], (img: string, size: number) => `
        min-width: ${size}px;
        min-height: ${size}px;
        background-image: url('${img}');
        background-size: cover;`),
    }),
  }),
  onHover() { ChangeButtonRevealer.revealChild = true },
  onHoverLost() { ChangeButtonRevealer.revealChild = false },
})
