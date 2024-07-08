import TaskWarrior from 'service/taskwarrior'
import { capitalize } from 'lib/utils'

const Button = label => Widget.Button({
  label,
  xalign: 0,
  cursor: 'pointer',
  className: 'side-btn',
})

const List = (name: 'tags' | 'projects') => Widget.Box(
  { vertical: true, className: name },
  Widget.Box({ className: 'title' },
    Widget.Label(capitalize(name)),
    Widget.Box({ hexpand: true }),
    Widget.Button({
      cursor: 'pointer',
      child: Widget.Icon('plus-symbolic')
    })
  ),
  Widget.Scrollable(
    { vexpand: true },
    Widget.Box({
      vertical: true,
      children: TaskWarrior.bind(
        (name === 'tags') ? 'tags' : 'projectsInActiveTag'
      ).as(t => t.map(Button))
    })
  )
)

export default Widget.Box({
  spacing: 16,
  vertical: true,
  className: 'sidebar',
}, List('projects'), List('tags'))
