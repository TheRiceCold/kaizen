import Sidebar from './Sidebar'
import TaskWarrior from 'service/taskwarrior'

const Task = data => Widget.Button({
  cursor: 'pointer',
  classNames: ['task-btn', data.urgency > 6 && 'urgent'],
  child: Widget.Box([
    Widget.Label(data.description),
    Widget.Box({ hexpand: true }),
    Widget.Label({ label: data.due ? data.due : 'no due date' })
  ])
})

const List = Widget.Scrollable({
  vexpand: true, className: 'list',
  child: Widget.Box({ vertical: true }).bind('children', TaskWarrior, 'tasks-in-active-tag-project', t => t.map(Task))
})

const Content = Widget.Box(
  { vertical: true, className: 'content' },
  Widget.Box(
    { className: 'header' },
    Widget.Label('Project: Kaizen'),
    Widget.Box({ hexpand: true }),
    Widget.Label('0%'),
  ),
  Widget.Box({
    className: 'progress',
    children: [
      Widget.Label({ label: '0/10 remaining', vpack: 'center' }),
      Widget.ProgressBar({ value: 0, hexpand: true }),
    ]
  }), List
)

export default Widget.Box({ className: 'tasks', vexpand: true }, Sidebar, Content)
