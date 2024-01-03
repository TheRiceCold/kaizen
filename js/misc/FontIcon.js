import AgsLabel from 'resource:///com/github/Aylur/ags/widgets/label.js'
import { Widget } from '../imports.js'

const { Gtk, GObject } = imports.gi

export default Widget.createCtor(
  class FontIcon extends AgsLabel {
    static { GObject.registerClass(this) }

    constructor(params = '') {
      const { icon = '', ...rest } = params

      super(typeof params === 'string' ? {} : rest)
      this.toggleClassName('font-icon')

      if (typeof params === 'object')
        this.icon = icon

      if (typeof params === 'string')
        this.icon = params
    }

    get icon() { return this.label }
    set icon(icon) { this.label = icon }

    get size() {
      return this.get_style_context() 
        .get_property('font-size', Gtk.StateFlags.NORMAL)
    }

    vfunc_get_preferred_height() {
      return [this.size, this.size]
    }

    vfunc_get_preferred_width() {
      return [this.size, this.size]
    }
  }
)
