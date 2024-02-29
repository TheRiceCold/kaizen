import layout from './layout'

const current = Variable(layout[0].attribute.name)

const Footer =  Widget.Box({
  hpack: 'center',
  spacing: options.theme.spacing,
  className: 'foot horizontal',
  children: layout.map(({
    attribute: { name, icon }
  }) => Widget.Button({
    xalign: 0,
    onClicked: () => current.value = name,
    child: Widget.Box([ Widget.Icon(icon), Widget.Label(name) ]),
    className: current.bind().as(v => `${v === name ? 'active' : ''}`),
  })),
})

const PagesStack = Widget.Stack({
  transition: 'slide_left_right',
  shown: current.bind() as never,
  children: layout.reduce((obj, page) => ({ ...obj, [page.attribute.name]: page }), {}),
})

export default  Widget.Box({
  vertical: true,
  className: 'settings',
  children: [ PagesStack, Footer ]
})
