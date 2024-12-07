import { writeFile } from 'astal'
import { App } from 'astal/gtk3'

import options from 'options'
import { type Option } from 'variables/option'
import { bash, ensureDirectory, sh } from 'lib/utils'
import { APP_CONFIG, TMP, USER_CONFIG } from 'lib/paths'

const { style, font } = options
const {
  scheme,
  radius,
  border,
  blur,
  shadows,
  widget,
} = options.style

const isDark = style.scheme.get() === 'dark'
const $ = (name: string, value: string | Option) => `$${name}: ${value}`

const variables = () => [
  $('bg', blur.get() ? `transparentize(${
    style[style.scheme.get()].bg.get()
  }, ${blur.get() / 100})` : style[style.scheme.get()].bg.get()),
  $('fg', style[style.scheme.get()].fg.get()),

  $('primary-bg', style[style.scheme.get()].primary.bg.get()),
  $('primary-fg', style[style.scheme.get()].fg.get()),
  $('error-bg', style[style.scheme.get()].error.bg.get()),
  $('error-fg', style[style.scheme.get()].error.fg.get()),
  $('scheme', scheme.get()),
  $('radius', `${radius.get()}px`),
  $('transition', `${options.transition.get()}ms`),
  $('shadows', `${shadows.get()}`),
  $('hover-bg', `transparentize(${
    style[style.scheme.get()].widget.get()
  }, ${widget.opacity.get() / 100})`),
  $('hover-fg', `lighten(${style[style.scheme.get()].fg.get()}, 8%)`),
  $('border-width', `${border.width.get()}px`),
  $('border-color', `transparentize(${
    style[style.scheme.get()].border.get()
  }, ${border.opacity.get() / 100})`),
  $('border', '$border-width solid $border-color'),
  $('active-gradient', `linear-gradient(to right, ${
    style[style.scheme.get()].bg.get()
  }, darken(${style[style.scheme.get()].primary.bg.get()}, 4%))`),
  $('shadow-color', `rgba(0, 0, 0, ${isDark ? 0.6 : 0.4})`),
  $('text-shadow', isDark ? '2pt 2pt 2pt $shadow-color' : 'none'),
  $('box-shadow', isDark ? '2pt 2pt 2pt 0 $shadow-color, inset 0 0 0 $border-width $border-color' : 'none'),
  $('font-name', font.default.name.get()),
  $('font-size', `${font.default.size.get()}pt`),
]

export async function resetCss() {
  const sass = `${TMP}/main.sass`
  const vars = `${TMP}/variables.sass`
  const css = `${USER_CONFIG}/main.css`

  const files = await sh(`fd '.sass' ${APP_CONFIG}/style`)
  const imports = [vars, ...files.split(/\s+/)].map((f) => `@import '${f}'`)

  ensureDirectory(TMP)

  try {
    writeFile(vars, variables().join('\n'))
    writeFile(sass, imports.join('\n'))
    await bash`sass ${sass} ${css}`

    App.apply_css(css, true)
  } catch (err) {
    err instanceof Error ? logError(err) : console.error(err)
  }
}

export default () => {
  resetCss()
  options.handler(['font', 'style'], resetCss)
  // monitorFile(`${TMP}/variables.sass`, resetCss)
}
