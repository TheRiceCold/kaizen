import options from 'options'
import icons from 'data/icons'
import { setupCursorHover } from 'misc/cursorhover'

const Theme = (img: string, label: string) => Widget.Button({
  setup: setupCursorHover,
  className: 'theme-button',
  child: Widget.Label({ label, hexpand: true }),
  css: `
    background-size: cover;
    background-image: url('${App.configDir}/assets/wallpapers/${img}');`
})

const ThemeList = Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: options.transition,
  child: Widget.Box({ 
    vertical: true,
    className: 'theme-list',
    children: [
      Theme('yukopi.png', 'Yukopi: gruvbox'),
      Theme('yukopi-light.png', 'Yukopi: rosepine'),
      Theme('poimandres.png', 'Ibu: poimandres'),
    ]
  })
})

export default Widget.Box({
  vertical: true,
  children: [
    Widget.Button({
      setup: setupCursorHover,
      className: 'list-button',
      child: Widget.Box([
        Widget.Label({ xalign: 0, label: 'Themes' }),
        Widget.Box({ hexpand: true }),
        Widget.Icon(icons.ui.arrow.down),
      ]),
      onClicked: () => ThemeList.revealChild = !ThemeList.revealChild
    }),
    ThemeList,
  ]
})
