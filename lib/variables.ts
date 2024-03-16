const { GLib } = imports.gi

const clock = (interval: number = 5000) => Variable(
  GLib.DateTime.new_now_local(),
  { poll: [interval, () => GLib.DateTime.new_now_local()] }
)

const showMedia = Variable(false)
globalThis['openMedia'] = showMedia

export { clock, showMedia }
