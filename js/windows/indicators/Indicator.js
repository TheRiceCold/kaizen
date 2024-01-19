import { Widget, Audio } from '../../imports.js'
import { Brightness, Indicator } from '../../services/main.js'
import { MarginRevealer } from '../../misc/AdvancedRevealers.js'

const OsdValue = (name, labelSetup, progressSetup, props = {}) => Widget.Box({
  ...props,
  hexpand: true,
  vertical: true,
  className: 'osd-bg osd-value',
  attribute: { 'disable': () => valueNumber.label = '󰖭' },
  children: [
    Widget.Box({
      vexpand: true,
      children: [
        Widget.Label({
          xalign: 0,
          yalign: 0,
          hexpand: true,
          label: `${name}`,
          className: 'osd-label',
        }),
        Widget.Label({
          label: '100',
          hexpand: false,
          setup: labelSetup,
          className: 'osd-value-txt',
        }),
      ]
    }),
    Widget.ProgressBar({
      hexpand: true,
      vertical: false,
      setup: progressSetup,
      className: 'osd-progress',
    })
  ],
})

const brightnessIndicator = OsdValue('Brightness',
  self => self.hook(Brightness, self => {
    self.label = `${Math.round(Brightness.screen_value * 100)}`;
  }, 'notify::screen-value'),
  self => self.hook(Brightness, progress => {
    const updateValue = Brightness.screen_value;
    progress.value = updateValue;
  }, 'notify::screen-value'),
)

const volumeIndicator = OsdValue('Volume',
  self => self.hook(Audio, label => {
    label.label = `${Math.round(Audio.speaker?.volume * 100)}`;
  }),
  self => self.hook(Audio, progress => {
    const updateValue = Audio.speaker?.volume;
    if (!isNaN(updateValue)) progress.value = updateValue;
  }),
);

export default MarginRevealer({
  showClass: 'osd-show',
  hideClass: 'osd-hide',
  transition: 'slide_down',
  extraSetup: self => self.hook(Indicator, (revealer, value) => {
    if (value > -1) 
      revealer.attribute.show()
    else 
      revealer.attribute.hide()
  }, 'popup'),
  child: Widget.Box({
    hpack: 'center',
    vertical: false,
    className: 'spacing-h-10',
    children: [brightnessIndicator, volumeIndicator]
  })
})
