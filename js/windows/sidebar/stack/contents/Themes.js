import { Widget } from '../../../../imports.js'

const Title = Widget.Box({
  vpack: 'start',
  className: 'sidebar-group-invisible txt spacing-h-5',
  children: [
    Widget.Label({
      xalign: 0,
      hexpand: true,
      label: 'Themes',
      className: 'txt-title-small margin-left-10',
    })
  ]
})

const Content = Widget.Box({ hexpand: true, vertical: true })

export default Widget.Box({
  vexpand: true,
  vertical: true,
  className: 'sidebar-group spacing-v-5',
  children: [ Title, Content ]
})
