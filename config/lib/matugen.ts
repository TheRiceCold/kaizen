import { timeout } from 'astal'

import options from 'options'
import { USER_CONFIG } from './paths' 
import { sh, dependencies } from './utils'

const { image } = options.wallpaper

function animate(...setters: Array<() => void>) {
  const delay = options.transition.get() * 0.5
  setters.forEach((fn, i) => timeout(delay * i, fn))
}

export async function matugen(
  type: 'image' | 'color' = 'image',
  arg = image.get(),
) {
  if (!options.autoGenerateColors.get()) return

  const { dark, light } = options.style
  const colors = await sh(`matugen --dry-run -j hex ${type} ${arg}`)
  const c = JSON.parse(colors).colors as { light: Colors, dark: Colors }

  animate(
    () => {
      dark.widget.set(c.dark.on_surface)
      light.widget.set(c.light.on_surface)
    },
    () => {
      dark.border.set(c.dark.outline)
      light.border.set(c.light.outline)
    },
    () => {
      dark.bg.set(c.dark.surface)
      light.bg.set(c.light.surface)
    },
    () => {
      dark.fg.set(c.dark.on_surface)
      light.fg.set(c.light.on_surface)
    },
    () => {
      dark.primary.bg.set(c.dark.primary)
      light.primary.bg.set(c.light.primary)
    },
    () => {
      dark.primary.fg.set(c.dark.on_primary)
      light.primary.fg.set(c.light.on_primary)
    },
    () => {
      dark.error.bg.set(c.dark.error)
      light.error.bg.set(c.light.error)
    },
    () => {
      dark.error.fg.set(c.dark.on_error)
      light.error.fg.set(c.light.on_error)
    },
  )
}

type Colors = {
  background: string
  error: string
  error_container: string
  inverse_on_surface: string
  inverse_primary: string
  inverse_surface: string
  on_background: string
  on_error: string
  on_error_container: string
  on_primary: string
  on_primary_container: string
  on_primary_fixed: string
  on_primary_fixed_variant: string
  on_secondary: string
  on_secondary_container: string
  on_secondary_fixed: string
  on_secondary_fixed_variant: string
  on_surface: string
  on_surface_variant: string
  on_tertiary: string
  on_tertiary_container: string
  on_tertiary_fixed: string
  on_tertiary_fixed_variant: string
  outline: string
  outline_variant: string
  primary: string
  primary_container: string
  primary_fixed: string
  primary_fixed_dim: string
  scrim: string
  secondary: string
  secondary_container: string
  secondary_fixed: string
  secondary_fixed_dim: string
  shadow: string
  surface: string
  surface_bright: string
  surface_container: string
  surface_container_high: string
  surface_container_highest: string
  surface_container_low: string
  surface_container_lowest: string
  surface_dim: string
  surface_variant: string
  tertiary: string
  tertiary_container: string
  tertiary_fixed: string
  tertiary_fixed_dim: string
}
