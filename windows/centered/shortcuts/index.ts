import RevealerWindow from 'windows/RevealerWindow'
import data from 'data/shortcuts'
import Header from './Header'

export const Keybinds = Widget.Box({
  homogeneous: true,
  children: data.map((group, _) => Widget.Box({
    vertical: true,
    children: group.map((category, _) => Widget.Box({
      vertical: true,
      children: [
        Widget.Label({ 
          xalign: 0, 
          css: 'font-size: 1.5em;',
          label: `${category.icon} ${category.name}`
        }),
        Widget.Box({
          vertical: false,
          className: 'spacing-h-10',
          children: [
            Widget.Box({
              vertical: true,
              homogeneous: true,
              children: category.binds.map((keybinds, _) => Widget.Box({ // Binds
                vertical: false,
                children: keybinds.keys.map((key, _) => Widget.Label({ // Specific keys
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
                className: 'txt chearsheet-action txt-small',
              }))
            })
          ]
        })
      ]
    }))
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
