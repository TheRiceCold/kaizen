import { Widget, Utils } from '../../../imports.js'

import TodoList from './TodoList.js'
import Calendar from './Calendar.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const defaultShown = 'calendar'
const contentStack = Widget.Stack({
  hexpand: true,
  items: [
    ['calendar', Calendar()],
    ['todo', TodoList()],
  ],
  transitionDuration: 180,
  transition: 'slide_up_down',
  setup: stack => Utils.timeout(1, () => stack.shown = defaultShown)
})

const StackButton = (stackItemName, icon, name) => Widget.Button({
  className: 'button-minsize sidebar-navrail-btn sidebar-button-alone txt-small spacing-h-5',
  onClicked: btn => {
    contentStack.shown = stackItemName
    const kids = btn.get_parent().get_children()
    kids.forEach(kid => {
      if (kid !== btn)
        kid.toggleClassName('sidebar-navrail-btn-active', false)
      else
        btn.toggleClassName('sidebar-navrail-btn-active', true)
    })
  },
  child: Widget.Box({
    className: 'spacing-v-5',
    vertical: true,
    children: [
      Widget.Label({ className: 'txt icon-material txt-hugeass', label: icon }),
      Widget.Label({ label: name, className: 'txt txt-smallie' }),
    ]
  }),
  setup: btn => Utils.timeout(1, () => {
    setupCursorHover(btn)
    btn.toggleClassName('sidebar-navrail-btn-active', defaultShown === stackItemName)
  })
})

export default Widget.Box({
  className: 'sidebar-group spacing-h-5',
  setup: box => {
    box.pack_start(Widget.Box({
      vpack: 'center',
      vertical: true,
      homogeneous: true,
      className: 'sidebar-navrail spacing-v-10',
      children: [
        StackButton('calendar', '', 'Calendar'),
        StackButton('todo', '󰏫', 'To Do'),
      ]
    }), false, false, 0)
    box.pack_end(contentStack, false, false, 0)
  }
})
