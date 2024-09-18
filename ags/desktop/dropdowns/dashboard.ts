const Item = (label: string, activate) => Widget.MenuItem({
  cursor: 'pointer',
  child: Widget.Label({ hpack: 'start', label }),
  setup(self: typeof Widget.MenuItem) {
    if (Array.isArray(activate))
      self.submenu = Widget.Menu({ children: activate })
    else
      self.onActivate = activate
  }
})

export default event => Widget.Menu({
  children: [
    // TODO: Adding Dashboard Widgets
    Item('󰜬 Add Widgets', [
      Item(' Player', () => { }),
      Item(' Clock', () => { }),
      Item(' Calendar', () => { }),
      Item('󱞁 Notes', () => { }),
      Item(' System', () => { }),
      Item(' Weather', () => { }),
      Item(' Quotes', () => { }),
      Item(' Verses', () => { }),
    ])
  ]
}).popup_at_pointer(event)
