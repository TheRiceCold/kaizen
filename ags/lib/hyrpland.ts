import options from 'options'
const { messageAsync } = await Service.import('hyprland')

const { hyprland } = options
const {
  radius,
  spacing,
  border: { width },
  blur,
  shadows,
  dark: {
    primary: { bg: darkActive },
  },
  light: {
    primary: { bg: lightActive },
  },
  scheme,
} = options.theme

const deps = [
  'hyprland',
  spacing.id,
  radius.id,
  blur.id,
  width.id,
  shadows.id,
  darkActive.id,
  lightActive.id,
  scheme.id,
]

export default function init() {
  options.handler(deps, setupHyprland)
  setupHyprland()
}

function activeBorder() {
  const color = scheme.value === 'dark' ? darkActive.value : lightActive.value

  return color.replace('#', '')
}

function sendBatch(batch: string[]) {
  const cmd = batch
    .filter((x) => !!x)
    .map((x) => `keyword ${x}`)
    .join('; ')
  return messageAsync(`[[BATCH]]/${cmd}`)
}

async function setupHyprland() {
  const gapsWhenOnly = hyprland.gapsWhenOnly.value ? 0 : 1
  const shader =
    hyprland.shader.value === 'CRT'
      ? `${TMP}/shaders/CRT.frag`
      : `${TMP}/shaders/${hyprland.shader.value}.glsl`

  const gaps = Math.floor(hyprland.gaps.value * spacing.value)

  sendBatch([
    'debug:damage_tracking 0',
    `general:border_size ${width}`,
    `decoration:gaps_out ${gaps}`,
    `decoration:gaps_in ${Math.floor(gaps / 2)}`,
    `general:border_size ${width}`,
    `decoration:rounding ${radius}`,
    `master:no_gaps_when_only ${gapsWhenOnly}`,
    `dwindle:no_gaps_when_only ${gapsWhenOnly}`,
    `decoration:drop_shadow ${shadows.value ? 'yes' : 'no'}`,
    `general:col.active_border rgba(${activeBorder()}ff)`,
    `general:col.inactive_border rgba(${hyprland.inactiveBorder.value})`,
    `decoration:screen_shader ${hyprland.shader.value === 'default' ? '[[EMPTY]]' : shader}`,
  ])

  await sendBatch(App.windows.map(({ name }) => `layerrule unset, ${name}`))

  if (blur.value > 0) {
    sendBatch(
      App.windows.flatMap(({ name }) => [
        `layerrule unset, ${name}`,
        `layerrule blur, ${name}`,
        `layerrule ignorealpha ${/* based on shadow color */ 0.29}, ${name}`,
      ]),
    )
  }
}
