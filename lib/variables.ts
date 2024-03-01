const { GLib } = imports.gi

const clock = Variable(
  GLib.DateTime.new_now_local(),
  { poll: [5000, () => GLib.DateTime.new_now_local()] }
)

export {
  clock
}
