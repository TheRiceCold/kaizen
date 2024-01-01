import { Widget, Utils, Bluetooth, Network } from '../../imports.js'
import { BluetoothIndicator, NetworkIndicator } from '../../misc/StatusIcons.js'
import { setupCursorHover } from '../../misc/CursorHover.js'
import FontIcon from '../../misc/FontIcon.js'

export const ToggleIconWifi = (props = {}) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Wifi | Right-click to configure',
  onClicked: Network.toggleWifi,
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center wifi', '&'])
  },
  child: NetworkIndicator(),
  connections: [
    [Network, btn => {
      btn.toggleClassName(
        'sidebar-button-active', 
        Network.wifi?.internet == 'connected' || Network.wired?.internet == 'connected'
      )
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
    const status = Bluetooth?.enabled
    if (status) 
      Utils.exec('rfkill block bluetooth')
    else 
      Utils.exec('rfkill unblock bluetooth')
  },
  onSecondaryClickRelease: () => {
    Utils.execAsync(['bash', '-c', 'blueberry &'])
  },
  child: BluetoothIndicator(),
  connections: [[
    Bluetooth, btn => {
      btn.toggleClassName('sidebar-button-active', Bluetooth?.enabled)
    }
  ]],
  setup: setupCursorHover,
  ...props,
})

export const HyprToggleIcon = (icon, name, hyprlandConfigValue, props = {}) => Widget.Button({
  className: 'txt-small sidebar-iconbutton',
  tooltipText: `${name}`,
  onClicked: btn => {
    // Set the value to 1 - value
    Utils.execAsync(`hyprctl -j getoption ${hyprlandConfigValue}`).then((result) => {
      const currentOption = JSON.parse(result).int
      Utils.execAsync(['bash', '-c', `hyprctl keyword ${hyprlandConfigValue} ${1 - currentOption} &`]).catch(print)
      btn.toggleClassName('sidebar-button-active', currentOption == 0)
    }).catch(print)
  },
  child: Widget.Label({
    label: icon,
    hpack: 'center',
    className: 'icon-material txt-norm',
  }),
  setup: btn => {
    btn.toggleClassName('sidebar-button-active', JSON.parse(Utils.exec(`hyprctl -j getoption ${hyprlandConfigValue}`)).int == 1)
    setupCursorHover(btn)
  },
  ...props,
})

export const ModuleNightLight = (props = {}) => Widget.Button({ // TODO: Make this work
  properties: [
    ['enabled', false],
    ['yellowlight', undefined],
  ],
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Night Light',
  onClicked: (self) => {
    self._enabled = !self._enabled
    self.toggleClassName('sidebar-button-active', self._enabled)
    // if (self._enabled) Utils.execAsync(['bash', '-c', 'wlsunset & disown'])
    if (self._enabled) 
      Utils.execAsync('wlsunset')
    else 
      Utils.execAsync('pkill wlsunset')
  },
  child: FontIcon(''),
  setup: (self) => {
    setupCursorHover(self)
    self._enabled = !!Utils.exec('pidof wlsunset')
    self.toggleClassName('sidebar-button-active', self._enabled)
  },
  ...props,
})

export const ModuleInvertColors = (props = {}) => Widget.Button({
  tooltipText: 'Color inversion',
  className: 'txt-small sidebar-iconbutton',
  onClicked: button => {
    const shaderPath = JSON.parse(Utils.exec('hyprctl -j getoption decoration:screen_shader')).str
    if (shaderPath != "[[EMPTY]]" && shaderPath != "") {
      Utils.execAsync(['bash', '-c', `hyprctl keyword decoration:screen_shader ''`]).catch(print)
      button.toggleClassName('sidebar-button-active', false)
    }
    else {
      Utils.execAsync(['bash', '-c', `hyprctl keyword decoration:screen_shader ~/.config/hypr/shaders/invert.frag`]).catch(print)
      button.toggleClassName('sidebar-button-active', true)
    }
  },
  child: FontIcon('󰌁'),
  setup: setupCursorHover,
  ...props,
})

export const ModuleIdleInhibitor = (props = {}) => Widget.Button({ // TODO: Make this work
  properties: [
    ['enabled', false],
    ['inhibitor', undefined],
  ],
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Keep system awake',
  onClicked: (self) => {
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
  child: FontIcon(''),
  setup: setupCursorHover,
  ...props,
})

export const ModuleEditIcon = (props = {}) => Widget.Button({ // TODO: Make this work
  ...props,
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
  child: Widget.Label({
    label: 'edit', 
    className: 'icon-material txt-norm'
  }),
  setup: button => setupCursorHover(button)
})

export const ModuleReloadIcon = (props = {}) => Widget.Button({
  ...props,
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Reload Hyprland',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'hyprctl reload &'])
    App.toggleWindow('sideright')
  },
  child: FontIcon('󰑓'),
  setup: btn =>  setupCursorHover(btn)
})

export const ModuleSettingsIcon = (props = {}) => Widget.Button({
  ...props,
  tooltipText: 'Open Settings',
  className: 'txt-small sidebar-iconbutton',
  onClicked: () => {
    Utils.execAsync(['bash', '-c', 'XDG_CURRENT_DESKTOP="gnome" gnome-control-center', '&'])
    App.toggleWindow('sideright')
  },
  child: FontIcon(''),
  setup: btn => setupCursorHover(btn)
})

export const ModulePowerIcon = (props = {}) => Widget.Button({
  ...props,
  className: 'txt-small sidebar-iconbutton',
  tooltipText: 'Session',
  onClicked: () => {
    App.toggleWindow('session')
    App.closeWindow('sideright')
  },
  child: FontIcon(''),
  setup: btn => setupCursorHover(btn)
})
