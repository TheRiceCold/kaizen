import ListRevealer from './ListRevealer'
import { setupCursorHover } from 'misc/cursorhover'

const Theme = (img: string, label: string) => Widget.Button({
  setup: setupCursorHover,
  className: 'theme-button',
  child: Widget.Label({ label, hexpand: true }),
  css: `
    background-size: cover;
    background-image: url('${App.configDir}/assets/wallpapers/${img}');`
})

export default ListRevealer('Custom Themes', Widget.Box({ 
  vertical: true,
  className: 'theme-list',
  children: [
    Theme('yukopi.png', 'Yukopi: gruvbox'),
    Theme('yukopi-light.png', 'Yukopi: rosepine'),
    Theme('poimandres.png', 'Ibu: poimandres'),
  ]
}))
