export const TimerSeconds = Variable(0)
export const TimerMode = Variable('work')

export const pausableInterval = (interval, callback) => {
  let source
  return {
    stop() {
      if (source) {
        source.destroy()
        source = null
      } 
      else console.warn('already stopped')
    },
    start() {
      if (!source) source = setInterval(callback, interval)
      else console.warn('already running')
    },
    toggle() {
      if (!source)
        source = setInterval(callback, interval)
      else {
        source.destroy()
        source = null
      }
    },
  }
}

const TimerInterval = pausableInterval(1000, () => TimerSeconds.value = TimerSeconds.value + 1)

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

const convertTime = (seconds: number) => {
  let hours = Math.floor(seconds / 3600)
  let minutes = Math.floor((seconds % 3600) / 60)
  let remainingSeconds = seconds % 60

  // Add leading zeros if needed
  hours = hours < 10 ? '0' + hours : hours
  minutes = minutes < 10 ? '0' + minutes : minutes
  remainingSeconds = remainingSeconds < 10 ? '0' + remainingSeconds : remainingSeconds

  return { hours, minutes, seconds: String(remainingSeconds) }
}

export default Widget.CenterBox({
  vertical: true,
  homogeneous: true,
  className: 'timer',
  start_widget: Widget.CenterBox({
    startWidget: Widget.Label({
      hpack: 'start',
      vpack: 'center',
      className: 'title',
      label: 'Focus Session',
    }),
    endWidget: Widget.Box(
      { hpack: 'end', className: 'select' },
      Widget.Button({
        label: 'Work',
        vpack: 'center',
        className: 'selection',
        onClicked: () => TimerMode.setValue('work'),
      }).hook(TimerMode, (self) => self.className = 'selection'),
      Widget.Button({
        label: 'Break',
        vpack: 'center',
        onClicked: () => TimerMode.setValue('break'),
        className: `work-timer-${TimerMode.value == 'break'} work-timer-selection`,
      }).hook(TimerMode, self => {
        self.className = `work-timer-${TimerMode.value === 'break'} work-timer-selection`
      })
    ),
  }),
  centerWidget: Widget.Box({ vexpand: true, hpack: 'center' }).hook(TimerSeconds, self => {
    const time = convertTime(TimerSeconds.value)
    self.child = Widget.Label({
      hpack: 'fill',
      className: 'work-timer-time',
      label: `${time.hours}:${time.minutes}:${time.seconds}`
    })
  }),
  endWidget: Widget.Box({
    hpack: 'center',
    vpack: 'center',
    className: 'work-timer-buttons',
    children: [
      Widget.Button({
        label: '󰐎',
        onClicked: () => TimerInterval.toggle(),
        classNames: ['icon', 'work-timer-button']
      }),
      Widget.Button({
        onClicked: () => {
          TimerInterval.stop()
          TimerSeconds.value = 0
        },
        label: '󰦛',
        classNames: ['icon', 'work-timer-button']
      }),
      Widget.Button({
        onClicked: () => {
          Utils.exec(`bash -c 'echo "${TimerSeconds.value},${getCurrentDateTime()},${TimerMode.value}" >> ${App.configDir}/_data/timerhistory.txt'`)
          TimerInterval.stop()
          TimerSeconds.value = 0
        },
        label: '󰈼',
        classNames: ['icon', 'work-timer-button']
      }),
    ],
  })
})
