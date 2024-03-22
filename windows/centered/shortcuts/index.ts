const { Gdk, Gtk } = imports.gi
import RevealerWindow from 'windows/RevealerWindow'
import shortcutsData from 'data/shortcuts'

const Header = Widget.Box({
  vertical: true,
  className: "spacing-h-15",
  children: [
    Widget.Box({
      hpack: 'center',
      className: 'spacing-h-5 cheatsheet-title',
      children: [
        Widget.Label({
          hpack: 'center',
          label: 'Shortcut keys',
          className: 'txt-title',
          css: 'margin-right: 0.5rem;',
        }),
        Widget.Label({
          vpack: 'center',
          className: "cheatsheet-key txt-small",
          label: "",
        }),
        Widget.Label({
          vpack: 'center',
          className: "cheatsheet-key-notkey txt-small",
          label: "+",
        }),
        Widget.Label({
          vpack: 'center',
          className: "cheatsheet-key txt-small",
          label: '/',
        })
      ]
    }),
    Widget.Label({
      useMarkup: true,
      selectable: true,
      className: 'txt-small txt',
      justify: Gtk.Justification.CENTER,
      label: 'Sheet data stored in <tt>~/.config/ags/data/shortcuts.ts</tt>'
    }),
  ]
})


export const Keybinds = Widget.Box({
  vertical: false,
  homogeneous: true,
  className: "spacing-h-15",
  children: shortcutsData.map((group, _) => Widget.Box({
    vertical: true,
    className: 'spacing-v-15',
    children: group.map((category, _) => Widget.Box({
      vertical: true,
      className: 'spacing-v-15',
      children: [
        Widget.Box({
          vertical: false,
          className: 'spacing-h-10',
          children: [
            Widget.Label({
              xalign: 0,
              label: category.icon,
              className: `icon-material txt-larger cheatsheet-color-${category.id}`,
            }),
            Widget.Label({
              xalign: 0,
              label: category.name,
              className: 'cheatsheet-category-title txt',
            }),
          ]
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
                  className: `${['OR', '+'].includes(key) ? 'cheatsheet-key-notkey' : 'cheatsheet-key cheatsheet-color-' + category.id} txt-small`,
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
  child: Widget.Box({
    vertical: true,
    className: 'shortcuts',
    children: [ Header, Keybinds ]
  })
})
