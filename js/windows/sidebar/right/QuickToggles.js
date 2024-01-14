import { App, Widget, Utils, Bluetooth, Network, Hyprland } from '../../../imports.js'
import { BluetoothIndicator, NetworkIndicator } from './StatusIcons.js'
import { setupCursorHover } from '../../../misc/CursorHover.js'

const expandTilde = path =>
  path.startsWith('~') ? imports.gi.GLib.get_home_dir() + path.slice(1) : path

export const ToggleIconWifi = (props = {}) => Widget.Button({
  onClicked: Network.toggleWifi,
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Wifi | Right-click to configure',
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi', '&'])
    App.closeWindow('sideright')
  },
  child: NetworkIndicator(),
  connections: [
    [Network, btn => {
      btn.toggleClassName('sidebar-button-active', [Network.wifi?.internet, Network.wired?.internet].includes('connected'))
    }],
    [Network, btn => {
      btn.tooltipText = (`${Network.wifi?.ssid} | Right-click to configure` || 'Unknown')
    }],
  ],
  setup: setupCursorHover,
  ...props,
})

export const ToggleIconBluetooth = (props = {}) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Bluetooth | Right-click to configure',
  onClicked: () => {
    Utils.exec(`rfkill ${Bluetooth?.enabled ? 'block' : 'unblock'} bluetooth`)
  },
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'blueberry &'])
    App.closeWindow('sideright')
  },
  child: BluetoothIndicator(),
  connections: [[Bluetooth, btn =>
    btn.toggleClassName('sidebar-button-active', Bluetooth?.enabled)
  ]],
  setup: setupCursorHover,
  ...props,
})

export const HyprToggleIcon = (icon, name, hyprlandConfigValue, props = {}) => Widget.Button({
  tooltipText: name,
  className: 'txt-small sidebar-iconbutton',
  onClicked: btn => {
    Utils.execAsync(`hyprctl -j getoption ${hyprlandConfigValue}`).then(result => {
      const currentOption = JSON.parse(result).int
      Utils.execAsync(['bash', '-c', `hyprctl keyword ${hyprlandConfigValue} ${1 - currentOption} &`]).catch(print)
      btn.toggleClassName('sidebar-button-active', currentOption == 0)
    }).catch(print)
  },
  child: Widget.Label({ label: icon, className: 'txt-norm', hpack: 'center' }),
  setup: btn => {
    btn.toggleClassName('sidebar-button-active', JSON.parse(Utils.exec(`hyprctl -j getoption ${hyprlandConfigValue}`)).int == 1)
    setupCursorHover(btn)
  }, ...props,
})

export const ModuleNightLight = (props = {}) => Widget.Button({
  tooltipText: 'Night Light',
  className: 'txt-small sidebar-iconbutton',
  properties: [['enabled', false], ['yellowlight', undefined]],
  onClicked: self => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    Utils.execAsync(self._enabled ? 'wlsunset' : 'pkill wlsunset')
  },
  child: Widget.Label({ label: '󱩌', className: 'txt-norm' }),
  setup: self => {
    setupCursorHover(self)
    self._enabled = !!Utils.exec('pidof wlsunset')
    self.toggleClassName('sidebar-button-active', self._enabled)
  },
  ...props,
})

export const ModuleInvertColors = (props = {}) => Widget.Button({
  tooltipText: 'Color inversion',
  className: 'txt-small sidebar-iconbutton',
  onClicked: btn => {
    Hyprland.sendMessage('j/getoption decoration:screen_shader').then(output => {
      const shaderPath = JSON.parse(output)['str'].trim()
      if (shaderPath != '[[EMPTY]]' && shaderPath != '') {
        Utils.execAsync(['bash', '-c', 'hyprctl keyword decoration:screen_shader \'[[EMPTY]]\'']).catch(print)
        btn.toggleClassName('sidebar-button-active', false)
      }
      else {
        Hyprland.sendMessage(
          `j/keyword decoration:screen_shader ${expandTilde('~/.config/hypr/shaders/invert.frag')}`
        ).catch(print)
        btn.toggleClassName('sidebar-button-active', true)
      }
    })
  },
  child: Widget.Label({ label: '󰌁', className: 'txt-norm' }),
  setup: setupCursorHover,
  ...props,
})

export const ModuleIdleInhibitor = (props = {}) => Widget.Button({ // TODO: Make this work
  properties: [['enabled', false], ['inhibitor', undefined]],
  tooltipText: 'Keep system awake',
  className: 'txt-small sidebar-iconbutton',
  onClicked: self => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    if (self._enabled) {
      self._inhibitor = Utils.subprocess(
        ['wayland-idle-inhibitor.py'],
        output => print(output),
        err => logError(err),
        self,
      )
    }
    else self._inhibitor.force_exit()
  },
  setup: setupCursorHover,
  child: Widget.Label({ label: '', className: 'txt-norm' }),
  ...props,
})

export const ModuleEditIcon = (props = {}) => Widget.Button({
  ...props,
  setup: btn => setupCursorHover(btn),
  className: 'txt-small sidebar-iconbutton',
  child: Widget.Label({ label: 'edit', className: 'txt-norm' }),
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
})

export const ModuleReloadIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Reload Hyprland',
  setup: btn => setupCursorHover(btn),
  className: 'txt-small sidebar-iconbutton',
  child: Widget.Label({ label: '󰑐', className: 'norm' }),
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'hyprctl reload &'])
    App.toggleWindow('sideright')
  },
})

export const ModuleSettingsIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Open Settings',
  setup: btn => setupCursorHover(btn),
  className: 'txt-small sidebar-iconbutton',
  child: Widget.Label({ label: '', className: 'txt-norm' }),
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
})

export const ModulePowerIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Power Menu',
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    App.toggleWindow('powermenu')
    App.closeWindow('sideright')
  },
  setup: btn => setupCursorHover(btn),
  child: Widget.Label({ label: '', className: 'txt-norm' }),
})
