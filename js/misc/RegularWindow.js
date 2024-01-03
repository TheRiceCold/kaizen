import { Widget } from '../imports.js'
import AgsWidget from 'resource:///com/github/Aylur/ags/widgets/widget.js'

class RegularWindow extends AgsWidget(imports.gi.Gtk.Window, 'RegularWindow') {
  static { AgsWidget.register(this) }
  constructor(params) { super(params) }
}

export default Widget.createCtor(RegularWindow)
