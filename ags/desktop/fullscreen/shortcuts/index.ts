import RevealerWindow from 'desktop/RevealerWindow'
import { VBox } from 'widgets'

import Header from './Header'

import data from 'data/shortcuts'

const { Box, Label } = Widget

export const Keybinds = data.map((group, _) => VBox(
  group.map((category, _) => VBox([
    Label({
      xalign: 0,
      css: 'font-size: 1.5em;',
      label: `${category.icon} ${category.name}`
    }),
    Box([
      VBox({
        homogeneous: true,
        children: category.binds.map((keybinds, _) => Box({
          children: keybinds.keys.map((key, _) => Label({
            label: key,
            className: `${['OR', '+'].includes(key) ? 'cheatsheet-key-notkey' : 'cheatsheet-key cheatsheet-color-' + category.id}`,
          }))
        }))
      }),
      VBox({
        homogeneous: true,
        children: category.binds.map((keybinds, _) => Label({
          xalign: 0,
          label: keybinds.action,
        }))
      })
    ])
  ]))
))

export default RevealerWindow({
  name: 'shortcuts',
  className: 'shortcuts',
  child: VBox({ className: 'container' }, Header, ...Keybinds)
})
