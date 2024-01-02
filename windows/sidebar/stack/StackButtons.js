import { Widget } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'

export default (state, items) => 
  items.map(({ icon, title, ...props }) => Widget.Button({
    ...props,
    css: 'font-size: 16px;',
    className: 'sidebar-iconbutton',
    onClicked: () => state.value = title,
    child: (typeof icon === 'string') ? FontIcon(icon) : Widget.Icon(icon.img),
  }).hook(
    state, 
    btn => btn.toggleClassName('active', title === state.value)
  ))
