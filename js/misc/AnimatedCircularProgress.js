const { Gtk } = imports.gi
const Lang = imports.lang
import { Utils, Widget } from '../imports.js'

export default ({
  initTo = 0,
  initFrom = 0,
  initAnimTime = 2900,
  extraSetup= () => {},
  ...props
}) => Widget.DrawingArea({
  ...props,
  css: `${initFrom != initTo ? 'font-size: ' + initFrom + 'px; transition: ' + initAnimTime + 'ms linear;' : ''}`,
  setup: area => {
    const styleContext = area.get_style_context()
    const width = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL)
    const height = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL)
    const marginLeft = styleContext.get_margin(Gtk.StateFlags.NORMAL).left
    const marginRight = styleContext.get_margin(Gtk.StateFlags.NORMAL).right
    const marginTop = styleContext.get_margin(Gtk.StateFlags.NORMAL).top
    const marginBottom = styleContext.get_margin(Gtk.StateFlags.NORMAL).bottom
    area.set_size_request(width + marginLeft + marginRight, height + marginTop + marginBottom)
    area.connect('draw', Lang.bind(area, (area, cr) => {
      const styleContext = area.get_style_context()
      const width = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL)
      const height = styleContext.get_property('min-height', Gtk.StateFlags.NORMAL)
      const padding = styleContext.get_padding(Gtk.StateFlags.NORMAL).left
      const marginLeft = styleContext.get_margin(Gtk.StateFlags.NORMAL).left
      const marginRight = styleContext.get_margin(Gtk.StateFlags.NORMAL).right
      const marginTop = styleContext.get_margin(Gtk.StateFlags.NORMAL).top
      const marginBottom = styleContext.get_margin(Gtk.StateFlags.NORMAL).bottom
      area.set_size_request(width + marginLeft + marginRight, height + marginTop + marginBottom)

      const progressValue = styleContext.get_property('font-size', Gtk.StateFlags.NORMAL) / 100.0

      const bgStroke = styleContext.get_property('min-width', Gtk.StateFlags.NORMAL)
      const fgStroke = bgStroke - padding
      const radius = Math.min(width, height) / 2.0 - Math.max(bgStroke, fgStroke) / 2.0
      const centerX = width / 2.0 + marginLeft
      const centerY = height / 2.0 + marginTop
      const startAngle = -Math.PI / 2.0
      const endAngle = startAngle + (2 * Math.PI * progressValue)
      const startX = centerX + Math.cos(startAngle) * radius
      const startY = centerY + Math.sin(startAngle) * radius
      const endX = centerX + Math.cos(endAngle) * radius
      const endY = centerY + Math.sin(endAngle) * radius

      // Draw background
      const background_color = styleContext.get_property('background-color', Gtk.StateFlags.NORMAL)
      cr.setSourceRGBA(background_color.red, background_color.green, background_color.blue, background_color.alpha)
      cr.arc(centerX, centerY, radius, 0, 2 * Math.PI)
      cr.setLineWidth(bgStroke)
      cr.stroke()

      if (progressValue == 0) return

      // Draw progress
      const color = styleContext.get_property('color', Gtk.StateFlags.NORMAL)
      cr.setSourceRGBA(color.red, color.green, color.blue, color.alpha)
      cr.arc(centerX, centerY, radius, startAngle, endAngle)
      cr.setLineWidth(fgStroke)
      cr.stroke()

      // Draw rounded ends for progress arcs
      cr.setLineWidth(0)
      cr.arc(startX, startY, fgStroke / 2, 0, 0 - 0.01)
      cr.fill()
      cr.arc(endX, endY, fgStroke / 2, 0, 0 - 0.01)
      cr.fill()
    }))

    if (initFrom !== initTo)
      Utils.timeout(20, () => area.css = `font-size: ${initTo}px;`, area)
    else 
      area.css = 'font-size: 0;'

    extraSetup(area)
  },
})
