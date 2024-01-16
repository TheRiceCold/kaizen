import { Widget } from '../../../imports.js'

export default ({ content }) => Widget.Box({
  children: [
    Widget.Box({
      vertical: true,
      className: 'qs-menu',
      children: [ content ],
    })
  ],
})
