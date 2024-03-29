const { GLib } = imports.gi

const showMedia = Variable(false)

const clock = (interval: number = 5000) => Variable(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

const sidemenuShow = {
  quicksettings: Variable(false), 
  datemenu: Variable(false)
}

globalThis['sidemenuShow'] = (name:string) => sidemenuShow[name].value = !sidemenuShow[name].value

export { clock, showMedia, sidemenuShow }
