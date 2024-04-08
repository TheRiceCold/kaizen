import icons from 'data/icons'

const { GLib } = imports.gi

const divide = ([total, free]) => free / total

const clock = (interval: number = 5000) => Variable(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

const cpu = Variable(0, {
  poll: [
    2000, 'top -bn 2', 
    out => divide([100, out.split('\n')
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

const notifications = await Service.import('notifications')

const notificationIcon = notifications.bind('dnd').as(
  (dnd: boolean) => dnd ? icons.notifications.silent : 'notification-symbolic'
)

const showWidget = {
  popup: {
    media: Variable(false),
    colorWheel: Variable(false),
    annotation: Variable(false),
  },
  sideleft: {
    apis: Variable(false),
  },
  sideright: {
    datemenu: Variable(false),
    quicksettings: Variable(false), 
  }
}

export { 
  clock, 
  cpu, ram,
  showWidget,
  notificationIcon,
}
