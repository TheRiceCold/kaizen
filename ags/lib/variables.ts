const { GLib } = imports.gi

const divide = ([total, free]) => free / total

const clock = (interval: number = 5000) => Variable(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

const cpu = Variable(0, {
  poll: [
    2000, 'top -bn 2', out => divide([100, out.split('\n')
      .find((line: string) => line.includes('Cpu(s)'))
      .split(/\s+/)[1]
      .replace(',', '.')])
  ],
})

const ram = Variable(0, {
  poll: [
    2000, 'free', out => divide(out.split('\n')
      .find((line: string) => line.includes('Mem:'))
      .split(/\s+/)
      .splice(1, 2))
  ],
})

const showWidget = {
  // TOP
  indicator: Variable(false),
  annotation: Variable(false),
  player: Variable(false),
  color: Variable(false),

  // BOTTOM
  dock: Variable(false),
  keyboard: Variable(false),

  // SIDE
  quicksettings: Variable(false),
  datemenu: Variable(false),

  ask: Variable(false),
}

export {
  clock,
  cpu, ram,
  showWidget,
}
