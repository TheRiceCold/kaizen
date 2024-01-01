import { Widget, Utils } from '../../imports.js'

import { getCalendarLayout } from '../../misc/CalendarLayout.js'
import { setupCursorHover } from '../../misc/CursorHover.js'
import { FontIcon } from '../../misc/main.js'

import { TodoWidget } from './TodoList.js'

let calendarJson = getCalendarLayout(undefined, true)
function getDateInXMonthsTime(x) {
  let currentDate = new Date() // Get the current date
  let targetMonth = currentDate.getMonth() + x // Calculate the target month
  let targetYear = currentDate.getFullYear() // Get the current year

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
  className: `sidebar-calendar-btn ${
    (today == 1) ? 'sidebar-calendar-btn-today' 
      : (today == -1 ? 'sidebar-calendar-btn-othermonth' : '')
  }`,
  child: Widget.Overlay({
    child: Widget.Box({}),
    overlays: [Widget.Label({
      hpack: 'center',
      className: 'txt-smallie txt-semibold sidebar-calendar-btn-txt',
      label: String(day),
    })],
  })
})

const CalendarWidget = () => {
  const calendarMonthYear = Widget.Button({
    className: 'txt txt-large sidebar-calendar-monthyear-btn',
    onClicked: () => shiftCalendarXMonths(0),
    setup: button => {
      button.label = `${new Date().toLocaleString('default', { month: 'long' })} ${new Date().getFullYear()}`
      setupCursorHover(button)
    }
  })
  const addCalendarChildren = (box, calendarJson) => {
    const children = box.get_children()
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      child.destroy()
    }
    box.children = calendarJson.map(row => Widget.Box({
      className: 'spacing-h-5',
      children: row.map(day => CalendarDay(day.day, day.today)),
    }))
  }

  function shiftCalendarXMonths(x) {
    let monthshift = (x == 0) ? 0 : x + 1
    let newDate = (monthshift == 0) ? new Date() : getDateInXMonthsTime(monthshift)

    calendarJson = getCalendarLayout(newDate, (monthshift == 0))
    calendarMonthYear.label = `${monthshift == 0 ? '' : '• '}${newDate.toLocaleString('default', { month: 'long' })} ${newDate.getFullYear()}`
    addCalendarChildren(calendarDays, calendarJson)
  }

  const calendarHeader = Widget.Box({
    className: 'spacing-h-5 sidebar-calendar-header',
    setup: box => {
      box.pack_start(calendarMonthYear, false, false, 0)
      box.pack_end(Widget.Box({
        className: 'spacing-h-5',
        children: [
          Widget.Button({
            child: FontIcon(''),
            setup: setupCursorHover,
            onClicked: () => shiftCalendarXMonths(-1),
            className: 'sidebar-calendar-monthshift-btn',
          }),
          Widget.Button({
            child: FontIcon(''),
            setup: setupCursorHover,
            onClicked: () => shiftCalendarXMonths(1),
            className: 'sidebar-calendar-monthshift-btn',
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
    // ['stars', Widget.Label({ label: 'GitHub feed will be here' })],
  ],
  transition: 'slide_up_down',
  transitionDuration: 180,
  setup: stack => Utils.timeout(1, () => {
    stack.shown = defaultShown
  })
})

const StackButton = (stackItemName, icon, name) => Widget.Button({
  className: 'button-minsize sidebar-navrail-btn sidebar-button-alone txt-small spacing-h-5',
  onClicked: button => {
    contentStack.shown = stackItemName
    const kids = button.get_parent().get_children()
    kids.forEach(kid => {
      if (kid != button) 
        kid.toggleClassName('sidebar-navrail-btn-active', false)
      else 
        button.toggleClassName('sidebar-navrail-btn-active', true)
    })
  },
  child: Widget.Box({
    vertical: true,
    className: 'spacing-v-5',
    children: [ FontIcon(icon), Widget.Label({ label: name }) ]
  }),
  setup: button => Utils.timeout(1, () => {
    setupCursorHover(button)
    button.toggleClassName('sidebar-navrail-btn-active', defaultShown === stackItemName)
  })
})

export const ModuleCalendar = () => Widget.Box({
  className: 'sidebar-group spacing-h-5',
  setup: box => {
    box.pack_start(Widget.Box({
      vpack: 'center',
      homogeneous: true,
      vertical: true,
      className: 'sidebar-navrail spacing-v-10',
      children: [
        StackButton('calendar', '', 'Calendar'),
        StackButton('todo', '󰏪', 'To Do'),
        // StackButton(box, 'stars', 'star', 'GitHub'),
      ]
    }), false, false, 0)
    box.pack_end(contentStack, false, false, 0)
  }
})
