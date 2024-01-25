import { Widget } from '../../imports.js'
import { Indicator } from '../../services/main.js'
import { icons } from '../../constants/main.js'

/**
 * @param {number} brightness
 * @returns {string}
 */
const brightnessToIcon = brightness => {
  const idx = Math.floor(brightness * (icons.brightness.screen.length - 1));
  return icons.brightness.screen[idx];
};

/**
 * @param {number} volume
 * @returns {string}
 */
const volumeToIcon = volume => {
  if (volume <= 0)    return icons.audio.volume.muted;
  if (volume <= 0.33) return icons.audio.volume.low;
  if (volume <= 0.66) return icons.audio.volume.medium;
  if (volume <= 1) return icons.audio.volume.high;
  if (volume > 1) return icons.audio.volume.overamplified;
  return icons.audio.volume.high;
};


/**
 *
 * @param {import('types/@girs/gtk-3.0/gtk-3.0').Gtk.Widget} icon
 * @param {import('types/service').Binding<any, any, string>} label
 * @param {import('types/service').Binding<any, any, number>} progress
 * @param {import('types/widgets/box').BoxProps} props
 * @returns {import('types/widgets/box').default}
 */
const OsdValue = (icon, label, progress, props = {}) => Widget.Box({
  ...props,
  className: 'osd-indicator',
  hexpand: true,
  spacing: 8,
  children: [
    icon,
    Widget.ProgressBar({
      class_name: 'osd-progress',
      hexpand: true,
      vpack: 'center',
      vertical: false,
      value: progress
    }),
    Widget.Label({
      hexpand: false,
      className: 'osd-value-txt',
      label: label
    })
  ]
});

const brightnessIndicator = OsdValue(
  Widget.Label({
    className: 'osd-icon',
    label: Indicator.bind('brightness').transform(brightnessToIcon),
  }),
  Indicator.bind('brightness').transform(bright => `${Math.round(bright*100)}`),
  Indicator.bind('brightness')
);

const volumeIndicator = OsdValue(
  Widget.Icon({
    className: 'osd-icon',
    icon: Indicator.bind('volume').transform(volumeToIcon),
  }),
  Indicator.bind('volume').transform(volume => `${Math.round(volume*100)}`),
  Indicator.bind('volume').transform(volume => Math.min(volume, 1))
);

export default Widget.Revealer({
  transition: 'slide_down',
  child: Widget.Box({
    vertical: true,
    children: [
      Widget.Box({
        children: [
          Widget.Stack({
            transition: 'slide_up_down',
            class_name: 'indicator-container',
            visible_child_name: Indicator.bind('current'),
            items: [
              ['brightness', brightnessIndicator],
              ['volume', volumeIndicator],
            ]
          }),
        ]
      }),
    ]
  })
}).hook(Indicator, (revealer, value) => {
  revealer.reveal_child = (value > -1)
}, 'popup')

