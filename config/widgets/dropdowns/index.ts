import { Gtk } from 'astal/gtk3'

export const layoutsMenu = new Gtk.Menu()
layoutsMenu.add(new Gtk.MenuItem({ label: 'Master' }))
layoutsMenu.add(new Gtk.MenuItem({ label: 'Dwindle' }))

export const windowMenu = new Gtk.Menu()
windowMenu.add(new Gtk.MenuItem({ label: 'Pin' }))
windowMenu.add(new Gtk.MenuItem({ label: 'Float' }))
windowMenu.add(new Gtk.MenuItem({ label: 'Center' }))
windowMenu.add(new Gtk.MenuItem({ label: 'Fullscreen' }))
windowMenu.add(new Gtk.MenuItem({ label: 'Quit' }))

export const sessionMenu = new Gtk.Menu()
sessionMenu.add(new Gtk.MenuItem({ label: 'Lock' }))
sessionMenu.add(new Gtk.MenuItem({ label: 'Sleep' }))
sessionMenu.add(new Gtk.MenuItem({ label: 'Reboot' }))
sessionMenu.add(new Gtk.MenuItem({ label: 'Logout' }))
sessionMenu.add(new Gtk.MenuItem({ label: 'Shutdown' }))
