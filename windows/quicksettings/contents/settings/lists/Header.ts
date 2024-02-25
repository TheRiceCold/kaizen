export default (label: string, children = []) => Widget.Box({
  vpack: 'start',
  children: [
    Widget.Label({
      label,
      xalign: 0,
      hexpand: true,
      className: 'txt-title-small',
    })
  ].concat(children)
})
