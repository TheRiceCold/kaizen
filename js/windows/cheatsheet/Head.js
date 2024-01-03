import { Widget } from '../../imports.js'
const { Box, Label } = Widget

export default Box({
  hpack: 'center',
  className: 'spacing-h-15',
  children: [
    Label({
      hpack: 'center',
      css: 'margin-right: 0.682rem;',
      className: 'txt-title txt',
      label: 'Cheat sheet',
    }),
    Label({
      vpack: 'center',
      className: 'cheatsheet-key txt-small',
      label: '⌘',
    }),
    Label({
      vpack: 'center',
      className: 'cheatsheet-key-notkey txt-small',
      label: '+',
    }),
    Label({
      vpack: 'center',
      className: 'cheatsheet-key txt-small',
      label: '/',
    })
  ]
})
