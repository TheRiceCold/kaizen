import { App, Hyprland, Utils } from '../imports.js'
import { options } from '../constants/main.js'

const noIgnorealpha = ['launcher', 'powermenu', 'quicksettings']

/** @param {Array<string>} batch */
function sendBatch(batch) {
  const cmd = batch
    .filter(x => !!x)
    .map(x => `keyword ${x}`)
    .join('; ')

  Hyprland.sendMessage(`[[BATCH]]/${cmd}`)
}

function getColor(sass) {
  if (sass.includes('#'))
    return sass.replace('#', '')

  if (sass.includes('$')) {
    const opt = options.list().find(opt => opt.sass === sass.replace('$', ''))
    return opt?.value.replace('#', '') || 'ff0000'
  }
}

export function hyprlandInit() {
  if (Utils.readFile('/tmp/ags/hyprland-init')) return

  sendBatch(Array.from(App.windows).flatMap(([name]) => [
    `layerrule blur, ${name}`,
    noIgnorealpha.some(skip => name.includes(skip))
      ? '' : `layerrule ignorealpha 0.6, ${name}`,
  ]))

  // Utils.writeFile('init', '/tmp/ags/hyprland-init')
}

export function setupHyprland() {
  const radii = options.radii.value
  const border_width = options.border.width.value
  const drop_shadow = options.desktop.drop_shadow.value
  const inactive_border = options.hypr.inactive_border.value
  const accent = getColor(options.theme.accent.accent.value)
  const wm_gaps = Math.floor(options.hypr.wm_gaps_multiplier.value * options.spacing.value)

  sendBatch([
    `general:gaps_out ${wm_gaps}`,
    `general:border_size ${border_width}`,
    `general:gaps_in ${Math.floor(wm_gaps / 2)}`,
    `general:col.active_border rgba(${accent}ff)`,
    `general:col.inactive_border ${inactive_border}`,

    `decoration:rounding ${radii}`,
    `decoration:drop_shadow ${drop_shadow ? 'yes' : 'no'}`,
  ])
}
