import Header from '../header.js'

export default {
  icon: '󰂲',
  sub: '',
  name: 'bluetooth',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ 
      Header('Bluetooth'), 
      // Contents 
    ],
    className: 'notification-list spacing-v-5',
  })
}
