import icons from 'data/icons'

const { GLib } = imports.gi
const notifications = await Service.import('notifications')

const notificationIcon = notifications.bind('dnd').as(
  (dnd: boolean) => dnd ? icons.notifications.silent : 'notification-symbolic'
)

const clock = (interval: number = 5000) => Variable(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

const showMedia = Variable(false)

const sidemenuShow = {
  quicksettings: Variable(false), 
  datemenu: Variable(false)
}

globalThis['sidemenuShow'] = (name:string) => sidemenuShow[name].value = !sidemenuShow[name].value

export { 
  clock, 
  showMedia, 
  sidemenuShow,
  notificationIcon,
}
