import { bash } from 'lib/utils'

const TimerSeconds = Variable(0)
const TimerMode = Variable('work')

const pausableInterval = (interval, callback) => {
  let source;
  return {
    stop() {
      if (source) {
        source.destroy();
        source = null;
      } else {
        console.warn('already stopped')
      }
    },
    start() {
      if (!source) {
        source = setInterval(callback, interval);
      } else {
        console.warn('already running')
      }
    },
    toggle() {
      if (!source) {
        source = setInterval(callback, interval);
      } else {
        source.destroy();
        source = null;
      }
    },
  }
}

const TimerInterval = pausableInterval(1000, () => {
  TimerSeconds.value = TimerSeconds.value + 1
})

function getCurrentDateTime() {
  const now = new Date()

  const hours = now.getHours().toString().padStart(2, '0')
  const minutes = now.getMinutes().toString().padStart(2, '0')
  const seconds = now.getSeconds().toString().padStart(2, '0')
  const date = now.getDate().toString().padStart(2, '0')
  const month = (now.getMonth() + 1).toString().padStart(2, '0') // Months are zero-based
  const year = now.getFullYear()

  const formattedDateTime = `${hours}:${minutes}:${seconds}:${date}:${month}:${year}`
  return formattedDateTime
}

const convertTime = (seconds) => {
  let hours = Math.floor(seconds / 3600);
  let minutes = Math.floor((seconds % 3600) / 60);
  let remainingSeconds = seconds % 60;

  // Add leading zeros if needed
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds

  return { hours, minutes, seconds: String(remainingSeconds) }
}


export default () => Widget.Overlay({
  className: 'timer',
  overlays: [
    Widget.CenterBox({
      vertical: true,
      homogeneous: true,
      startWidget: Widget.CenterBox({
        startWidget: Widget.Label({
          hpack: 'start',
          vpack: 'center',
          className: 'title',
          label: 'Focus Session',
        }),
        endWidget: Widget.Box({
          hpack: 'end',
          className: 'work-timer-select',
          children: [
            Widget.Button({
              vpack: "center",
              label: "Work",
              className: `work-timer-${TimerMode.value == "work"} work-timer-selection`,
              setup: (self) => {
                self.hook(TimerMode, (self) => {
                  self.className = `work-timer-${TimerMode.value == "work"} selection`
                })
              },
              onClicked: () => { TimerMode.setValue("work") },
            }),
            Widget.Button({
              label: "Break",
              vpack: "center",
              setup: (self) => {
                self.hook(TimerMode, (self) => {
                  self.class_name = `work-timer-${TimerMode.value == 'break'} work-timer-selection`
                })
              },
              className: `work-timer-${TimerMode.value == 'break'} work-timer-selection`,
              onClicked: () => { TimerMode.setValue('break') },
            })
          ],
        }),
      }),
      center_widget: Widget.Box({
        vexpand: true,
        hpack: 'center',
        setup: (self) => {
          self.hook(TimerSeconds, (self) => {
            const time = convertTime(TimerSeconds.value)
            self.child = Widget.Label({
              hpack: 'fill',
              className: 'time',
              label: `${time.hours}:${time.minutes}:${time.seconds}`
            })
          })
        }
      }),
      end_widget: Widget.Box({
        hpack: 'center',
        vpack: 'center',
        className: 'buttons',
        children: [
          Widget.Button({
            label: '󰐎',
            onClicked: () => TimerInterval.toggle(),
            classNames: ['icon', 'button']
          }),
          Widget.Button({
            onClicked: () => {
              TimerInterval.stop()
              TimerSeconds.value = 0
            },
            label: '󰦛',
            classNames: ['icon', 'button']
          }),
          Widget.Button({
            onClicked: () => {
              bash`echo "${TimerSeconds.value},${getCurrentDateTime()},${TimerMode.value}" >> ${App.configDir}/_data/timerhistory.txt'`
              TimerInterval.stop()
              TimerSeconds.value = 0
            },
            label: "󰈼",
            classNames: ['icon', 'work-timer-button']
          }),
        ],
      })
    })
  ]
})
