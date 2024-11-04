import { type ButtonProps } from 'types/widgets/button'

type TProps = ButtonProps & {
  window?: string,
}

export default ({ window = '', setup, ...props }: TProps) => Widget.Button({
  cursor: 'pointer',
  className: 'bar-button',
  setup(self: TProps) {
    let open = false

    self.toggleClassName(window)

    self.hook(App, (_, win: string, visible: boolean) => {
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

    if (setup) setup(self)
  },
  ...props,
})
