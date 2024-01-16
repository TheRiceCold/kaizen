import AgsWidget from 'resource:///com/github/Aylur/ags/widgets/widget.js'
// import WebKit2 from 'gi://WebKit2?version=4.1'
import { Widget } from '../../../imports.js'

const { Gtk, Vte } = imports.gi

class AgsSwitch extends AgsWidget(Gtk.Switch, 'AgsSwitch') {
  static { AgsWidget.register(this, {}) }
  /**
     * @param {import('types/widgets/widget').BaseProps<
     *      AgsSwitch, Gtk.Switch.ConstructorProperties
     * >} params */
  constructor(params) { super(params) }
}

export const Switch =  Widget.createCtor(AgsSwitch)
// export const WebView = Widget.subclass(WebKit2.WebView, "AgsWebView")
export const Terminal = Widget.subclass(Vte.Terminal, 'AgsVteTerminal')
