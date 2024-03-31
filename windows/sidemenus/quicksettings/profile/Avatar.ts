import options from 'options'
import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

const { image, size } = options.sideright.profile.avatar

const ChangeButtonRevealer = Widget.Revealer({ child: Widget.Icon(icons.ui.camera) })

export default Widget.EventBox({
  className: 'avatar',
  child: Widget.Overlay({
    child: Widget.Box({
      css: Utils.merge(
        [ image.bind(), size.bind() ], (img: string, size: number) => `
        min-width: ${size}px;
        min-height: ${size}px;
        background-image: url('${img}');
        background-size: cover;`),
    }),
    overlay: ChangeButtonRevealer,
  }),
  setup: setupCursorHover,
  onHover: () => ChangeButtonRevealer.revealChild = true,
  onHoverLost: () => ChangeButtonRevealer.revealChild = false,
  onPrimaryClick: () => { 
    // TODO: Open FileChooser
  }
})
