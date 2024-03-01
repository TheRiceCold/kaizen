const websites = [
  {
    name: 'NixOs',
    url: 'https://nixos.org'
  },
  {
    name: 'Figma',
    url: 'https://www.figma.com/files/recents-and-sharing'
  },
  {
    name: 'Reddit',
    url: 'https://reddit.com'
  },
  {
    name: 'Youtube',
    url: 'https://youtube.com'
  },
  {
    name: 'WhatsApp',
    url: 'https://web.whatsapp.com'
  },
]

export default Widget.Box({
  className: 'launcher-sites',
  homogeneous: false,
  spacing: 30,
  vertical: true,
  children: [
    Widget.Label({
      vpack: 'center',
      hpack: 'start',
      label: 'Favourite Sites',
      className: 'launcher-site-header',
    }),
    Widget.Scrollable({
      hscroll: 'never',
      class_name: 'launcher-sites-list',
      child: Widget.Box({
        spacing: 30,
        vertical: true,
        children: websites.map(i => Widget.Button({
          onClicked: () => Utils.execAsync(`firefox ${i.url} `),
          child: Widget.Box({
            spacing: 15,
            vertical: false,
            homogeneous: false,
            className: 'launcher-sites-site',
            children: [
              Widget.Icon({
                size: 30,
                icon: `${i.name.toLowerCase()}-symbolic`,
              }),
              Widget.Label({
                label: i.name,
                hpack: 'start',
                vpack: 'center',
                className: 'launcher-sites-site-title',
              }),
            ]
          })
        })),
      }),
    }),
  ]
})
