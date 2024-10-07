const { GLib } = imports.gi

const divide = ([total, free]) => free / total

const clock = (interval: number = 5000) => Variable<number>(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

export type greetTimeType = 'morning' | 'afternoon' | 'evening'
const greetTime = Variable<greetTimeType>('morning', { // every 15 min
  poll: [900_000, () => {
    const date = new Date()
    const hour = date.getHours()
    return hour < 12 ? 'morning' :
      hour <= 18 && hour >= 12 ? 'afternoon' : 'evening'
  }]
})

const temp = Variable<number>(0, {
  poll: [5000,
    'cat /sys/class/thermal/thermal_zone0/temp',
    (n: string) => Number.parseInt(n) / 100_000
  ],
})

const cpu = Variable<number>(0, {
  poll: [
    2000, 'top -bn 2', (out: string) => divide([100, out.split('\n')
      .find((line: string) => line.includes('Cpu(s)'))
      .split(/\s+/)[1]
      .replace(',', '.')])
  ],
})

const ram = Variable<number>(0, {
  poll: [
    2000, 'free', out => divide(out.split('\n')
      .find((line: string) => line.includes('Mem:'))
      .split(/\s+/)
      .splice(1, 2))
  ],
})

const showWidget = {
  // TOP
  indicator: Variable<boolean>(false),
  annotation: Variable<boolean>(false),
  player: Variable<boolean>(false),
  color: Variable<boolean>(false),

  // BOTTOM
  //dock: Variable<boolean>(false),
  keyboard: Variable<boolean>(false),

  // RIGHT
  quicksettings: Variable<boolean>(false),
  calendar: Variable<boolean>(false),

  // LEFT
  ask: Variable<boolean>(false),
}

export {
  clock, greetTime,
  showWidget,
  temp, cpu, ram,
}
