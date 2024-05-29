import { CommandsMenu } from 'desktop/menus'

export default Widget.Window({
  popup: false,
  visible: true,
  layer: 'bottom',
  focusable: false,
  name: 'bgoverlay',
  anchor: ['top', 'bottom', 'left', 'right'],
  child: Widget.EventBox({ onSecondaryClick: (_, event) => CommandsMenu(event) }),
})
