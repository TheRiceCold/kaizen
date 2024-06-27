import RevealerWindow from 'desktop/RevealerWindow'

import Header from './Header'
import data from 'data/shortcuts'

export const Keybinds = Widget.Box({
  children: data.map((group, _) => Widget.Box({
    vertical: true,
    children: group.map((category, _) => Widget.Box(
      { vertical: true },
      Widget.Label({
        xalign: 0,
        css: 'font-size: 1.5em;',
        label: `${category.icon} ${category.name}`
      }),
      Widget.Box(
        { vertical: false },
        Widget.Box({
          vertical: true,
          homogeneous: true,
          children: category.binds.map((keybinds, _) => Widget.Box({
            vertical: false,
            children: keybinds.keys.map((key, _) => Widget.Label({
              label: key,
              className: `${['OR', '+'].includes(key) ? 'cheatsheet-key-notkey' : 'cheatsheet-key cheatsheet-color-' + category.id}`,
            }))
          }))
        }),
        Widget.Box({
          vertical: true,
          homogeneous: true,
          children: category.binds.map((keybinds, _) => Widget.Label({
            xalign: 0,
            label: keybinds.action,
          }))
        })
      )
    ))
  })),
})


export default RevealerWindow({
  name: 'shortcuts',
  className: 'shortcuts',
  child: Widget.Box({
    vertical: true,
    className: 'container',
    children: [ Header, Keybinds ]
  })
})
