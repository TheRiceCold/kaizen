const { Box, Label } = Widget

export default Box({
  hpack: 'center',
  className: 'spacing-h-15',
  children: [
    Label({
      hpack: 'center',
      label: 'Cheat sheet',
      className: 'txt-title txt',
      css: 'margin-right: 0.682rem;',
    }),
    Label({
      label: '⌘',
      vpack: 'center',
      className: 'cheatsheet-key txt-small',
    }),
    Label({
      label: '+',
      vpack: 'center',
      className: 'cheatsheet-key-notkey txt-small',
    }),
    Label({
      label: '/',
      vpack: 'center',
      className: 'cheatsheet-key txt-small',
    })
  ]
})
