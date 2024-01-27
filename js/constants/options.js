import Option, { 
  apply, 
  resetOptions,
  getOptions,
} from '../settings/option.js'

import themes from './themes.js'

const option = (value, config) => new Option(value, config)

export default {
  reset: resetOptions,
  apply: apply,
  list: getOptions,

  spacing: option(6),
  padding: option(8),
  radii: option(12),

  popover_padding_multiplier: option(1.4, {
    'unit': '',
    'type': 'float',
    'category': 'General',
    'note': 'popover-padding: padding × this',
  }),

  color: {
    red: option('#D67A96', { 'sass': 'red' }),
    green: option('#93CDA8', { 'sass': 'green' }),
    yellow: option('#E8C881', { 'sass': 'yellow' }),
    blue: option('#6AAAFF', { 'sass': 'blue' }),
    magenta: option('#9F91FF', { 'sass': 'magenta' }),
    orange: option('#E79E64', { 'sass': 'orange' }),
  },

  theme: {
    name: option(themes[0].name, { 'category': 'exclude', 'note': 'Name to show as active in quicktoggles' }),
    icon: option(themes[0].icon, { 'category': 'exclude', 'note': 'Icon to show as active in quicktoggles' }),
    scheme: option('dark', {
      'enums': ['dark', 'light'],
      'type': 'enum',
      'note': "Color scheme to set on Gtk apps: 'light' or 'dark'",
      'title': 'Color Scheme',
      'sass': 'color-scheme',
    }),
    bg: option('#373559', { 'title': 'Background Color', 'sass': 'bg-color' }),
    fg: option('#eeeeee', { 'title': 'Foreground Color', 'sass': 'fg-color' }),
    accent: {
      accent: option('$blue', { 'category': 'Theme', 'title': 'Accent Color', 'sass': 'accent' }),
      fg: option('#141414', { 'category': 'Theme', 'title': 'Accent Foreground Color', 'sass': 'accent-fg' }),
      gradient: option('to right, $accent, lighten($accent, 6%)', { 'category': 'Theme', 'title': 'Accent Linear Gradient', 'sass': 'accent-gradient' }),
    },

    widget: {
      bg: option('$fg-color', { 'category': 'Theme', 'title': 'Widget Background Color', 'sass': '_widget-bg' }),
      opacity: option(94, { 'category': 'Theme', 'title': 'Widget Background Opacity', 'unit': '', 'sass': 'widget-opacity' }),
    },
  },

  border: {
    color: option('$fg-color', { 'category': 'Border', 'title': 'Border Color', 'sass': '_border-color' }),
    opacity: option(97, { 'category': 'Border', 'title': 'Border Opacity', 'unit': '', }),
    width: option(2, { 'category': 'Border', 'title': 'Border Width', }),
  },

  workspaces: option(5, {
    'category': 'Bar',
    'title': 'No. workspaces on bar and overview',
    'note': 'Set it to 0 to make it dynamic',
  }),

  hypr: {
    inactive_border: option('rgba(333333ff)', {
      'category': 'Border',
      'title': 'Border on Inactive Windows',
      'sass': 'exclude',
    }),
    wm_gaps_multiplier: option(2, {
      'category': 'General',
      'sass': 'wm-gaps-multiplier',
      'note': 'wm-gaps: padding × this',
      'type': 'float',
      'unit': '',
    }),
  },

  transition: option(200, {
    'category': 'exclude',
    'note': 'Transition time on aminations in ms, e.g on hover',
    'unit': 'ms',
  }),

  font: {
    font: option('FiraCode Nerd Font', {
      'type': 'font',
      'title': 'Font',
      'sass': 'font',
    }),
    mono: option('JetBrainsMono Nerd Font', {
      'title': 'Monospaced Font',
      'sass': 'mono-font',
    }),
    size: option(13, { 'sass': 'font-size', 'unit': 'pt' }),
  },

  bar: {
    position: option('top', {
      'enums': ['top', 'bottom'],
      'type': 'enum',
    }),
    style: option('normal', {
      'enums': ['floating', 'normal', 'separated'],
      'type': 'enum',
    }),
    flat_buttons: option(true, { 'sass': 'bar-flat-buttons' }),
    separators: option(true),
    icon: option('distro-icon', {
      'note': '"distro-icon" or a single font',
    }),
  },

  battery: {
    showPercentage: option(false, {
      'persist': true,
      'noReload': false,
      'category': 'exclude',
    }),
    bar: {
      showIcon: option(true, { 'category': 'Bar' }),
      width: option(28, { 'category': 'Bar' }),
      height: option(12, { 'category': 'Bar' }),
      full: option(false, { 'category': 'Bar' }),
    },
    low: option(30, { 'category': 'Bar' }),
    medium: option(50, { 'category': 'Bar' }),
  },

  desktop: {
    wallpaper: {
      fg: option('#fff', { sass: 'wallpaper-fg' }),
      img: option(themes[0].options['desktop.wallpaper.img'], { 'sassFormat': v => `"${v}"`, 'type': 'img' }),
    },
    screen_corners: option(true, { 'sass': 'screen-corners' }),
    clock: {
      enable: option(true),
      position: option('center center', { 'note': 'halign valign' }),
    },
    drop_shadow: option(true, { 'sass': 'drop-shadow' }),
    shadow: option('rgba(0, 0, 0, .5)', { 'sass': 'shadow' }),

    dock: {
      icon_size: option(56),
      pinned_apps: option([
        'firefox',
        'org.wezfurlong.wezterm',
        'org.gnome.Nautilus',
        'org.gnome.Calendar',
        'obsidian',
        'transmission-gtk',
        'caprine',
        'teams-for-linux',
        'discord',
        'spotify',
        'com.usebottles.bottles',
        'org.gnome.Software',
      ], { 'sass': 'exclude' }),
    },
  },


  notifications: {
    black_list: option(['Spotify'], { 'note': 'app-name | entry' }),
    position: option(['top'], { 'note': 'anchor' }),
    width: option(450),
  },

  substitutions: {
    icons: [
      ['transmission-gtk', 'transmission'],
      ['blueberry.py', 'bluetooth'],
      ['Caprine', 'facebook-messenger'],
      ['', 'preferences-desktop-display'],
    ],
    titles: [
      ['com.obsproject.Studio', 'OBS'],
      ['transmission-gtk', 'Transmission'],
      ['com.usebottles.bottles', 'Bottles'],
      ['com.github.wwmm.easyeffects', 'Easy Effects'],
      ['org.wezfurlong.wezterm', 'Wezterm'],
      ['firefox', 'Firefox'],
      ['org.gnome.Nautilus', 'Files'],
      ['', 'Desktop'],

      ['foot', '󰽒 Foot'],
      ['Godot', '  Godot'],
      ['kitty', '󰄛  Kitty'],
      ['krita', '  Krita'],
      ['VSCodium', '   VSCodium'],
      ['wihotspot-gui', 'Wi-Hotspot'],
      ['virt-manager', ' Virt-Manager']
    ],
  },
}
