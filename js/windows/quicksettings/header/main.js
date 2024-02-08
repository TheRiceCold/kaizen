import TabButtons from './TabButtons.js'
import SystemButtons from './SystemButtons.js'
import { variables, options } from '../../../constants/main.js'

const Uptime = Widget.Label({
  className: 'uptime',
  label: variables.uptime.bind('value').transform(v => `Uptime: ${v}`),
})

const Avatar = Widget.Box({ className: 'avatar' })
.hook(options.desktop.avatar, box => box.setCss(`
  background-image: url('${options.desktop.avatar.value}');
`)).on('size-allocate', box => {
  const h = box.get_allocated_height();
  box.set_size_request(Math.ceil(h * 1.1), -1);
})

export default Widget.Box({
  hexpand: true,
  className: 'header',
  children: [ 
    TabButtons,
    Widget.Box({ hexpand: true }), 
    SystemButtons, 
  ]
})
