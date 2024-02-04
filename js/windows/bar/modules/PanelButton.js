import { setupCursorHover } from '../../../misc/CursorHover.js'

export default ({
  className,
  content,
  window = '',
  setup,
  ...props
}) => Widget.Button({
  className: `panel-button ${className}`,
  child: Widget.Box({ children: [content] }),
  setup: self => {
    let open = false

    self.hook(App, (_, win, visible) => {
      if (win !== window) return

      if (open && !visible) {
        open = false
        self.toggleClassName('active', false)
      }

      if (visible) {
        open = true
        self.toggleClassName('active')
      }
    })

    if (setup)
      setup(self)

    setupCursorHover(self)
  }, ...props
})
