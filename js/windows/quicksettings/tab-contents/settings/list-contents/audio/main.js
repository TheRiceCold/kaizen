import Header from '../header.js'

export default {
  icon: '',
  name: 'audio',
  list: Widget.Box({
    vexpand: true,
    vertical: true,
    children: [ 
      Header('Audio'), 
      // Contents 
    ],
    className: 'notification-list spacing-v-5',
  })
}
