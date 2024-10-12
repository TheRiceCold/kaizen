import { type DrawingAreaProps } from 'types/widgets/drawingarea'

export default (values: number[])=> Widget.DrawingArea({
  widthRequest: 200,
  heightRequest: 200,

  drawFn(self: DrawingAreaProps, cr, w: number, h: number) {
    const radius = w / 2
    const center = { x: w / 2, y: h / 2 }

    cr.setLineWidth(2)

    const maxValue = values.reduce((partialSum, a) => partialSum + a, 0)

    let lastAngle = 0

    for (let i = 0; i < values.length; i++) {
      // Get color
      self.className = `pie-slice-${i + 1}`
      const styles = self.get_style_context()
      const fg = styles.get_color(imports.gi.Gtk.StateFlags.NORMAL)
      cr.setSourceRGBA(fg.red, fg.green, fg.blue, 1)

      // Max angle is Math.PI * 2
      const startAngle = lastAngle
      const diff = (values[i] / maxValue) * (Math.PI * 2)

      cr.arc(center.x, center.y, radius, startAngle, startAngle + diff)
      cr.lineTo(center.x, center.y)
      cr.fill()

      lastAngle = startAngle + diff
    }
  },
})
