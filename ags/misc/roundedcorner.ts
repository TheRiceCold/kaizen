const { Gtk } = imports.gi

export const RoundedCorner = (place, props) => Widget.DrawingArea({
  ...props,
  vpack: place.includes('top') ? 'start' : 'end',
  hpack: place.includes('left') ? 'start' : 'end',
  setup: widget => {
    /* HACK:
      * ensure a minimum size required for the window to even show up.
      * size chande later from css
    */
    const r = 2
    widget.set_size_request(r, r)
    widget.on('draw', (widget, cr) => {
      const r = widget.get_style_context().get_property('font-size', Gtk.StateFlags.NORMAL)
      widget.set_size_request(r, r)

      switch (place) {
        case 'topleft':
          cr.arc(r, r, r, Math.PI, 3 * Math.PI / 2)
          cr.lineTo(0, 0)
          break
        case 'topright':
          cr.arc(0, r, r, 3 * Math.PI / 2, 2 * Math.PI)
          cr.lineTo(r, 0)
          break
        case 'bottomleft':
          cr.arc(r, 0, r, Math.PI / 2, Math.PI)
          cr.lineTo(0, r)
          break
        case 'bottomright':
          cr.arc(0, 0, r, 0, Math.PI / 2)
          cr.lineTo(r, r)
          break
      }

      cr.closePath()
      cr.clip()
      Gtk.render_background(widget.get_style_context(), cr, 0, 0, r, r)
    })
  }
})

