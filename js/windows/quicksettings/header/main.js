import Buttons from './Buttons.js'
import { FontIcon } from '../../../misc/main.js'
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

const TabButtons = Widget.Box({
  children: [
    Widget.Button({
      className: 'icon-button',
      child: FontIcon('')
    }),
    Widget.Button({
      className: 'icon-button',
      child: FontIcon('󱍓')
    }),
    Widget.Button({
      className: 'icon-button',
      child: FontIcon('󰚩')
    })
  ]
})

export default Widget.Box({
  hexpand: true,
  className: 'header',
  children: [ TabButtons, Widget.Box({ hexpand: true }), Buttons ]
})
