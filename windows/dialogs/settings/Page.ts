import Group from './Group'

export default <T>(
  name: string,
  icon: string,
  ...groups: ReturnType<typeof Group<T>>[]
) => Widget.Box({
  className: 'page',
  attribute: { name, icon },
  child: Widget.Scrollable({
    css: 'min-height: 300px;',
    child: Widget.Box({
      vexpand: true,
      vertical: true,
      children: groups,
      className: 'page-content',
    }),
  }),
})
