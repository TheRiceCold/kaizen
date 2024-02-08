import Header from '../header.js'

export default {
  icon: '󰖩',
  name: 'network',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ 
      Header('Network'), 
      // Contents 
    ],
    className: 'notification-list spacing-v-5',
  })
}
