import { Widget, Variable } from '../../imports.js'

const showColorScheme = Variable(false, {})

const ColorBox = ({ name = 'Color', ...props}) => Widget.Box({
  ...props,
  homogeneous: true,
  children: [ Widget.Label({ label: `${name}` }) ]
})

const colorschemeContent = Widget.Box({
  className: 'osd-colorscheme spacing-v-5',
  vertical: true,
  hpack: 'center',
  children: [
    Widget.Label({
      xalign: 0,
      label: 'Colorscheme',
      className: 'txt-norm titlefont txt',
    }),
    Widget.Box({
      className: 'spacing-h-5',
      children: [
        ColorBox({ name: 'P', className: 'osd-color osd-color-primary' }),
        ColorBox({ name: 'P-c', className: 'osd-color osd-color-primaryContainer' }),
        ColorBox({ name: 'S', className: 'osd-color osd-color-secondary' }),
        ColorBox({ name: 'S-c', className: 'osd-color osd-color-secondaryContainer' }),
        ColorBox({ name: 'Sf-v', className: 'osd-color osd-color-surfaceVariant' }),
        ColorBox({ name: 'Sf', className: 'osd-color osd-color-surface' }),
        ColorBox({ name: 'Bg', className: 'osd-color osd-color-background' }),
      ]
    })
  ]
})

export default Widget.Revealer({
  transition: 'slide_down',
  transitionDuration: 200,
  child: colorschemeContent,
  connections: [[
    showColorScheme, revealer => {
      revealer.revealChild = showColorScheme.value
    }
  ]],
})
