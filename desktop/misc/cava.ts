const { Gtk } = imports.gi

export default ({
  bars = 20,
  width = 1,
  spacing = 1,
  height = 100,
  align = 'end',
  smooth = false,
  vertical = false,
}) => Widget.DrawingArea({
  className: 'cava',
  attribute: {
    cavaVar: Variable([], {
      listen: [
        [
          'bash', '-c',
          `printf "[general]\n  \
                    framerate=60\n    \
                    bars = ${bars}\n  \
                    bar_spacing = ${spacing}\n \
                    [input]\n \
                    method = pipewire\n \
                    [output]\n        \
                    channels = mono\n \
                    method = raw\n    \
                    raw_target = /dev/stdout\n \
                    data_format = ascii\n \
                    ascii_max_range = ${height}\n" | \
                    cava -p /dev/stdin`
        ],
        (out: string) => out.split(';').slice(0, -1)
      ]
    })
  },
  setup(self) {
    if (vertical)
      self.set_size_request(height, bars)
    else
      self.set_size_request(bars, height)
    const varHandler = self.attribute.cavaVar.connect('changed', () => self.queue_draw())
    self.on('destroy', () => {
      self.attribute.cavaVar.stopListen()
      self.attribute.cavaVar.disconnect(varHandler)
    })
  },
}).on('draw', (self, cr) => {
  const context = self.get_style_context()
  const w = self.get_allocated_width() * width
  const h = self.get_allocated_height()

  const bg = context.get_property('background-color', Gtk.StateFlags.NORMAL)
  const fg = context.get_property('color', Gtk.StateFlags.NORMAL)
  const radius = context.get_property('border-radius', Gtk.StateFlags.NORMAL)

  cr.arc(radius,     radius,     radius, Math.PI,        3 * Math.PI/2)
  cr.arc(w - radius, radius,     radius, 3 * Math.PI /2, 0            )
  cr.arc(w - radius, h - radius, radius, 0,              Math.PI/2    )
  cr.arc(radius,     h - radius, radius, Math.PI/2,      Math.PI      )
  cr.closePath()
  cr.clip()

  cr.setSourceRGBA(bg.red, bg.green, bg.blue, bg.alpha)
  cr.rectangle(0, 0, w, h)
  cr.fill()

  cr.setSourceRGBA(fg.red, fg.green, fg.blue, fg.alpha)
  if (!smooth) {
    for (let i = 0; i < self.attribute.cavaVar.value.length; i++) {
      const barHeight = h * (self.attribute.cavaVar.value[i] / height)
      let y = 0
      let x = 0
      switch (align) {
        case 'start':
          y = 0
          x = 0
          break
        case 'center':
          y = (h - barHeight) / 2
          x = (w - barHeight) / 2
          break
        case 'end':
        default:
          y = h - barHeight
          x = w - barHeight
          break
      }
      if (vertical)
        cr.rectangle(x, i * (h / bars), barHeight, h / bars)
      else
        cr.rectangle(i * (w / bars), y, w / bars, barHeight)
      cr.fill()
    }
  } else {
    let lastX = 0
    let lastY = h - h * (self.attribute.cavaVar.value[0] / height)
    cr.moveTo(lastX, lastY)
    for (let i = 1; i < self.attribute.cavaVar.value.length; i++) {
      const barHeight = h * (self.attribute.cavaVar.value[i] / height)
      const y = h - barHeight
      cr.curveTo(lastX + w / (bars - 1) / 2, lastY, lastX + w / (bars - 1) / 2, y, i * (w / (bars - 1)), y)
      lastX = i * (w / (bars - 1))
      lastY = y
    }
    cr.lineTo(w, h)
    cr.lineTo(0, h)
    cr.fill()
  }
})
