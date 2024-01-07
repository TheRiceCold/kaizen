import { Widget, Utils } from '../../../imports.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'
import { getCalendarLayout } from '../../../misc/CalendarLayout.js'

import { TodoWidget } from './TodoList.js'

let calendarJson = getCalendarLayout(undefined, true)
let monthshift = 0

function getDateInXMonthsTime(x) {
  let currentDate = new Date()
  let targetMonth = currentDate.getMonth() + x
  let targetYear = currentDate.getFullYear()

  targetYear += Math.floor(targetMonth / 12)
  targetMonth = (targetMonth % 12 + 12) % 12

  let targetDate = new Date(targetYear, targetMonth, 1)

  return targetDate
}

const weekDays = [ // MONDAY IS THE FIRST DAY OF THE WEEK :HESRIGHTYOUKNOW:
  { day: 'Mo', today: 0 },
  { day: 'Tu', today: 0 },
  { day: 'We', today: 0 },
  { day: 'Th', today: 0 },
  { day: 'Fr', today: 0 },
  { day: 'Sa', today: 0 },
  { day: 'Su', today: 0 },
]

const CalendarDay = (day, today) => Widget.Button({
  className: `sidebar-calendar-btn ${today == 1 ? 'sidebar-calendar-btn-today' : (today == -1 ? 'sidebar-calendar-btn-othermonth' : '')}`,
  child: Widget.Overlay({
    child: Widget.Box({}),
    overlays: [Widget.Label({
      hpack: 'center',
      label: String(day),
      className: 'txt-smallie txt-semibold sidebar-calendar-btn-txt',
    })],
  })
})

const CalendarWidget = () => {
  const calendarMonthYear = Widget.Button({
    onClicked: () => shiftCalendarXMonths(0),
    className: 'txt txt-large sidebar-calendar-monthyear-btn',
    setup: btn => {
      btn.label = `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`
      setupCursorHover(btn)
    }
  });
  const addCalendarChildren = (box, calendarJson) => {
    const children = box.get_children();
    children.forEach(child => child.destroy())
    box.children = calendarJson.map(row => Widget.Box({
      className: 'spacing-h-5',
      children: row.map(day => CalendarDay(day.day, day.today)),
    }))
  }
  function shiftCalendarXMonths(x) {
    if (x == 0) monthshift = 0;
    else monthshift += x;
    let newDate
    if (monthshift == 0) newDate = new Date();
    else newDate = getDateInXMonthsTime(monthshift);

    calendarJson = getCalendarLayout(newDate, (monthshift == 0));
    calendarMonthYear.label = `${monthshift == 0 ? '' : '• '}${newDate.toLocaleString('default', { month: 'long' })} ${newDate.getFullYear()}`;
    addCalendarChildren(calendarDays, calendarJson);
  }
  const calendarHeader = Widget.Box({
    className: 'spacing-h-5 sidebar-calendar-header',
    setup: box => {
      box.pack_start(calendarMonthYear, false, false, 0);
      box.pack_end(Widget.Box({
        className: 'spacing-h-5',
        children: [
          Widget.Button({
            setup: setupCursorHover,
            onClicked: () => shiftCalendarXMonths(-1),
            className: 'sidebar-calendar-monthshift-btn',
            child: Widget.Label({ label: '', className: 'txt-norm' }),
          }),
          Widget.Button({
            setup: setupCursorHover,
            onClicked: () => shiftCalendarXMonths(1),
            className: 'sidebar-calendar-monthshift-btn',
            child: Widget.Label({ label: '', className: 'txt-norm' }),
          })
        ]
      }), false, false, 0)
    }
  })
  const calendarDays = Widget.Box({
    hexpand: true,
    vertical: true,
    className: 'spacing-v-5',
    setup: box => addCalendarChildren(box, calendarJson)
  })
  return Widget.EventBox({
    onScrollUp: () => shiftCalendarXMonths(-1),
    onScrollDown: () => shiftCalendarXMonths(1),
    child: Widget.Box({
      hpack: 'center',
      children: [
        Widget.Box({
          hexpand: true,
          vertical: true,
          className: 'spacing-v-5',
          children: [
            calendarHeader,
            Widget.Box({
              homogeneous: true,
              className: 'spacing-h-5',
              children: weekDays.map(day => CalendarDay(day.day, day.today))
            }),
            calendarDays,
          ]
        })
      ]
    })
  })
}

const defaultShown = 'calendar'
const contentStack = Widget.Stack({
  hexpand: true,
  items: [
    ['calendar', CalendarWidget()],
    ['todo', TodoWidget()],
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
      Widget.Label({ className: `txt icon-material txt-hugeass`, label: icon }),
      Widget.Label({ label: name, className: 'txt txt-smallie' }),
    ]
  }),
  setup: btn => Utils.timeout(1, () => {
    setupCursorHover(btn)
    btn.toggleClassName('sidebar-navrail-btn-active', defaultShown === stackItemName)
  })
})

export default () => Widget.Box({
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
