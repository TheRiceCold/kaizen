const { GLib } = imports.gi

const showMedia = Variable(false)

const clock = (interval: number = 5000) => Variable(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

export { clock, showMedia }
