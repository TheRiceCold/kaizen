import { Widget } from '../../imports.js'
import { cheatsheet as data } from '../../constants/main.js'

const Header = category => Widget.Box({
  vertical: false,
  className: 'spacing-h-10',
  children: [
    Widget.Label({
      xalign: 0,
      label: category.icon,
      className: 'txt txt-larger',
    }),
    Widget.Label({
      xalign: 0,
      label: category.name,
      className: 'cheatsheet-category-title txt',
    }),
  ]
})

const Keys = category => Widget.Box({
  vertical: false,
  className: 'spacing-h-10',
  children: [
    Widget.Box({ // Keys
      vertical: true,
      homogeneous: true,
      children: category.binds.map(keybinds => Widget.Box({ // Binds
        vertical: false,
        children: keybinds.keys.map(key => Widget.Label({ // Specific keys
          label: key,
          className: `${key == 'OR' || key == '+'
            ? 'cheatsheet-key-notkey'
            : 'cheatsheet-key'} txt-small`,
        }))
      }))
    }),
    Widget.Box({
      vertical: true,
      homogeneous: true,
      children: category.binds.map(keybinds => Widget.Label({
        xalign: 0,
        label: keybinds.action,
        className: 'txt chearsheet-action txt-small',
      }))
    })
  ]
})

const Columns = group => Widget.Box({
  vertical: true,
  className: 'spacing-v-15',
  children: group.map(category => Widget.Box({
    vertical: true,
    className: 'spacing-v-15',
    children: [Header(category), Keys(category)]
  }))
})

export default Widget.Box({
  vertical: false,
  homogeneous: true,
  className: 'spacing-h-15',
  children: data.map(group => Columns(group))
})
