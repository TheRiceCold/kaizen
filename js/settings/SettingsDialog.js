import { FontIcon, RegularWindow } from '../misc/main.js'

import { options, icons } from '../constants/main.js'
import { getOptions, getValues } from './option.js'

const optionsList = getOptions()
const categories = Array.from(new Set(optionsList.map(opt => opt.category))).filter(category => category !== 'exclude')

const currentPage = Variable(categories[0])
const search = Variable('')
const showSearch = Variable(false)
showSearch.connect('changed', ({ value }) => {
  if (!value) search.value = ''
})

const EnumSetter = opt => {
  const lbl = Widget.Label().bind('label', opt)
  const step = (dir = 1) => {
    const i = opt.enums.findIndex(i => i === lbl.label)
    opt.setValue(dir > 0
      ? i + dir > opt.enums.length - 1
        ? opt.enums[0] : opt.enums[i + dir] : i + dir < 0
        ? opt.enums[opt.enums.length - 1] : opt.enums[i + dir], true
    )
  }
  const next = Widget.Button({
    child: FontIcon(icons.arrow.right),
    onClicked: () => step(+1),
  })
  const prev = Widget.Button({
    child: FontIcon(icons.arrow.left),
    onClicked: () => step(-1),
  })
  return Widget.Box({
    className: 'enum-setter',
    children: [prev, lbl, next],
  })
}

const Setter = opt => {
  switch (opt.type) {
    case 'number': return Widget.SpinButton({
      setup(self) {
        self.set_range(0, 1000)
        self.set_increments(1, 5)
        self.on('value-changed', () => opt.setValue(self.value, true))
        self.hook(opt, () => self.value = opt.value)
      },
    })
    case 'float':
    case 'object': return Widget.Entry({
      onAccept: self => opt.setValue(JSON.parse(self.text || ''), true),
      setup: self => self.hook(opt, () => self.text = JSON.stringify(opt.value)),
    })
    case 'string': return Widget.Entry({
      onAccept: self => opt.setValue(self.text, true),
      setup: self => self.hook(opt, () => self.text = opt.value),
    })
    case 'enum': return EnumSetter(opt)
    case 'boolean': return Widget.Switch()
      .on('notify::active', self => opt.setValue(self.active, true))
      .hook(opt, self => self.active = opt.value)

    case 'img': return Widget.FileChooserButton()
      .on('selection-changed', self => {
        opt.setValue(self.get_uri()?.replace('file://', ''), true)
      })

    case 'font': return Widget.FontButton({
      show_size: false,
      use_size: false,
      setup: self => self
        .on('notify::font', ({ font }) => opt.setValue(font, true))
        .hook(opt, () => self.font = opt.value),
    })
    default: return Widget.Label({ label: 'no setter with type ' + opt.type })
  }
}

const Row = opt => Widget.Box({
  className: 'row',
  attribute: opt,
  children: [
    Widget.Box({
      vertical: true,
      vpack: 'center',
      children: [
        opt.title && Widget.Label({ xalign: 0, className: 'summary', label: opt.title }),
        Widget.Label({ xalign: 0, className: 'id', label: `id: "${opt.id}"` }),
      ],
    }),
    Widget.Box({ hexpand: true }),
    Widget.Box({
      vpack: 'center',
      vertical: true,
      children: [
        Widget.Box({ hpack: 'end', child: Setter(opt) }),
        opt.note && Widget.Label({
          xalign: 1,
          label: opt.note,
          className: 'note',
        }),
      ],
    }),
  ],
})

const Page = category => Widget.Scrollable({
  vexpand: true,
  className: 'page',
  child: Widget.Box({
    className: 'page-content vertical',
    vertical: true,
    setup: self => self.hook(search, () => {
      for (const child of self.children) {
        child.visible =
          child.attribute.id.includes(search.value) ||
          child.attribute.title.includes(search.value) ||
          child.attribute.note.includes(search.value)
      }
    }),
    children: optionsList.filter(opt => opt.category.includes(category)).map(Row),
  }),
})

const sidebar = Widget.Revealer({
  revealChild: search.bind().transform(v => !v),
  transition: 'slide_right',
  child: Widget.Box({
    hexpand: false,
    vertical: true,
    children: [
      Widget.Box({
        className: 'sidebar-header',
        children: [
          Widget.Button({
            hexpand: true,
            label: icons.dialog.Search + ' Search',
            onClicked: () => showSearch.value = !showSearch.value,
          }),
        ]
      }),
      Widget.Scrollable({
        vexpand: true,
        hscroll: 'never',
        child: Widget.Box({
          className: 'sidebar-box vertical',
          vertical: true,
          children: [
            ...categories.map(name => Widget.Button({
              xalign: 0,
              onClicked: () => currentPage.setValue(name),
              label: (icons.dialog[name] || '') + ' ' + name,
              className: currentPage.bind().transform(v => `${v === name ? 'active' : ''}`),
            })),
          ],
        }),
      }),
      Widget.Box({
        className: 'sidebar-footer',
        child: Widget.Button({
          hexpand: true,
          className: 'copy',
          child: Widget.Label({ label: ' Save', xalign: 0 }),
          onClicked: () => {
            Utils.execAsync([ 'wl-copy', getValues() ])
            Utils.execAsync([
              'notify-send',
              '-i', 'preferences-desktop-theme-symbolic',
              'Theme copied to clipboard',
              'To save it permanently, make a new theme in <span weight="bold">themes.js</span>',
            ])
          },
        }),
      }),
    ],
  }),
})

const searchEntry = Widget.Revealer({
  transition: 'slide_down',
  revealChild: showSearch.bind(),
  transitionDuration: options.transition.bind('value'),
  child: Widget.Entry({
    setup: self => self.hook(showSearch, () => {
      if (!showSearch.value)
        self.text = ''

      if (showSearch.value)
        self.grab_focus()
    }),
    hexpand: true,
    className: 'search',
    placeholder_text: 'Search Options',
    secondary_icon_name: icons.apps.search,
    onChange: ({ text }) => search.value = text || '',
  }),
})

const categoriesStack = Widget.Stack({
  shown: currentPage.bind(),
  transition: 'slide_left_right',
  visible: search.bind().transform(v => !v),
  children: categories.reduce((obj, name) => { 
    obj[name] = Page(name); return obj 
  }, {}),
})

const searchPage = Widget.Box({
  visible: search.bind().transform(v => !!v),
  child: Page(''),
})

export default RegularWindow({
  title: 'Settings',
  name: 'settings-dialog',
  setup: win => win
    .on('delete-event', () => {
      win.hide()
      return true
    })
    .on('key-press-event', (_, event) => {
      if (event.get_keyval()[1] === imports.gi.Gdk.KEY_Escape) {
        showSearch.setValue(false)
        search.setValue('')
      }
    }).set_default_size(800, 500),

  child: Widget.Box({
    children: [
      sidebar,
      Widget.Box({
        vertical: true,
        children: [
          searchEntry,
          categoriesStack,
          searchPage,
        ],
      }),
    ],
  }),
})
