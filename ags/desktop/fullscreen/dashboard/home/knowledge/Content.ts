const Icon = icon => (icon !== null) && Widget.Label({
  label: icon,
  className: 'icon',
})

export default (
  className: string,
  icon: string,
  label,
  ...children
) => Widget.Box({
  vertical: true,
  classNames: ['content', className],
  children: [
    Icon(icon),
    Widget.Label({
      label,
      wrap: true,
      vpack: 'center',
      className: 'text',
      maxWidthChars: 48,
      justification: 'center',
    }), ...children
  ]
})
