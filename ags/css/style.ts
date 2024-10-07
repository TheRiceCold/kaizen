import { bash, dependencies, sh } from 'lib/utils'
import { type Opt } from 'lib/option'
import options from 'options'

const deps = ['font', 'theme']

const {
  dark,
  light,
  blur,
  scheme,
  padding,
  spacing,
  radius,
  shadows,
  widget,
  border,
  colors,
} = options.theme

const popoverPaddingMultiplier = 1.6

const t = (dark: Opt | string, light: Opt | string) =>
  scheme.value === 'dark' ? `${dark}` : `${light}`
const $ = (name: string, value: string | Opt) => `$${name}: ${value}`

const variables = () => [
  $('black', colors.black),

  $(
    'bg',
    blur.value
      ? `transparentize(${t(dark.bg, light.bg)}, ${blur.value / 100})`
      : t(dark.bg, light.bg),
  ),
  $('fg', t(dark.fg, light.fg)),

  $('primary-bg', t(dark.primary.bg, light.primary.bg)),
  $('primary-fg', t(dark.primary.fg, light.primary.fg)),
  $('error-bg', t(dark.error.bg, light.error.bg)),
  $('error-fg', t(dark.error.fg, light.error.fg)),
  $('scheme', scheme),
  $('padding', `${padding}pt`),
  $('spacing', `${spacing}pt`),
  $('radius', `${radius}px`),
  $('transition', `${options.transition}ms`),
  $('shadows', `${shadows}`),
  $(
    'widget-bg',
    `transparentize(${t(dark.widget, light.widget)}, ${widget.opacity.value / 100})`,
  ),
  $(
    'hover-bg',
    `transparentize(${t(dark.widget, light.widget)}, ${(widget.opacity.value * 0.9) / 100})`,
  ),
  $('hover-fg', `lighten(${t(dark.fg, light.fg)}, 8%)`),
  $('border-width', `${border.width}px`),
  $(
    'border-color',
    `transparentize(${t(dark.border, light.border)}, ${border.opacity.value / 100})`,
  ),
  $('border', '$border-width solid $border-color'),
  $(
    'active-gradient',
    `linear-gradient(to right, ${t(dark.primary.bg, light.primary.bg)}, darken(${t(dark.primary.bg, light.primary.bg)}, 4%))`,
  ),
  $('shadow-color', t('rgba(0, 0, 0, 0.6)', 'rgba(0, 0, 0, 0.4)')),
  $('text-shadow', t('2pt 2pt 2pt $shadow-color', 'none')),
  $(
    'box-shadow',
    t(
      '2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color',
      'none',
    ),
  ),
  $(
    'popover-border-color',
    `transparentize(${t(dark.border, light.border)}, ${Math.max((border.opacity.value - 1) / 100, 0)})`,
  ),
  $('popover-padding', `$padding * ${popoverPaddingMultiplier}`),
  $('popover-radius', radius.value === 0 ? '0' : '$radius + $popover-padding'),
  $('font-name', options.font.default.name),
  $('font-size', `${options.font.default.size}pt`),

  $('hyprland-gaps-multiplier', options.hyprland.gaps),
]

async function resetCss() {
  if (!dependencies('sass', 'fd')) return

  try {
    const vars = `${TMP}/variables.sass`
    const sass = `${TMP}/main.sass`
    const css = `${TMP}/main.css`

    const files = await sh(`fd '.sass' ${App.configDir}`)
    const imports = [vars, ...files.split(/\s+/)].map((f) => `@import '${f}'`)

    await Utils.writeFile(variables().join('\n'), vars)
    await Utils.writeFile(imports.join('\n'), sass)
    await bash`sass ${sass} ${css}`

    App.applyCss(css, true)
  } catch (err) {
    err instanceof Error ? logError(error) : console.error(err)
  }
}

Utils.monitorFile(App.configDir, resetCss)
options.handler(deps, resetCss)
await resetCss()
