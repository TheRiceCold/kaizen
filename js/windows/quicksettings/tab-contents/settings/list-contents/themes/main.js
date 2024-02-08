import Header from '../header.js'

export default {
  icon: '',
  name: 'themes',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ 
      Header('Themes'), 
      // Contents 
    ],
    className: 'notification-list spacing-v-5',
  })
}
