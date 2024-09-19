import { VBox } from 'widgets'

const Icon = (icon: string) =>
  (icon !== null) && Widget.Label({
    label: icon,
    className: 'icon',
  })

export default (
  className: string,
  icon: string,
  label: string,
  ...children
) => VBox(
  { classNames: ['content', className] },
  Icon(icon),
  Widget.Label({
    label,
    wrap: true,
    vpack: 'center',
    className: 'text',
    maxWidthChars: 48,
    justification: 'center',
  }),
  ...children
)
