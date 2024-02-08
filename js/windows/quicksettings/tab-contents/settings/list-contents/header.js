export default (label) => Widget.Box({
  vpack: 'start',
  className: 'spacing-h-5',
  children: [
    Widget.Label({
      label,
      xalign: 0,
      hexpand: true,
      className: 'txt-title-small',
    })
  ]
})
