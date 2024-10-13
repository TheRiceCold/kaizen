import options from 'options'
const { messageAsync } = await Service.import('hyprland')

const { inactiveBorder, layout, gapsIn, gapsOut, gapsWhenOnly, shader } = options.hyprland
const {
  radius,
  spacing,
  blur,
  shadows,
  border: { width },
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
  width.id,
  blur.id,
  shadows.id,
  darkActive.id,
  lightActive.id,
  scheme.id,
]

export default function init() {
  options.handler(deps, setupHyprland)
  setupHyprland()
}

function sendBatch(batch: string[]) {
  const cmd = batch
    .filter((x) => !!x)
    .map((x) => `keyword ${x}`)
    .join('; ')
  return messageAsync(`[[BATCH]]/${cmd}`)
}

async function setupHyprland() {
  const activeBorder = () => {
    const color = scheme.value === 'dark' ? darkActive.value : lightActive.value

    return color.replace('#', '')
  }

  sendBatch([
    'debug:damage_tracking 0',

    `master:no_gaps_when_only ${gapsWhenOnly.value ? 0 : 1}`,
    `dwindle:no_gaps_when_only ${gapsWhenOnly.value ? 0 : 1}`,

    `general:layout ${layout.value}`,
    `general:border_size ${width}`,
    `general:col.active_border rgba(${activeBorder()}ff)`,
    `general:col.inactive_border rgba(${inactiveBorder.value})`,

    `decoration:rounding ${radius}`,
    `decoration:gaps_in ${gapsIn.value}`,
    `decoration:gaps_out ${gapsOut.value}`,
    `decoration:drop_shadow ${shadows.value ? 'yes' : 'no'}`,
    `decoration:screen_shader ${
      shader.value === 'default'
        ? '[[EMPTY]]'
        : shader.value === 'CRT'
          ? `${CONFIG}/shaders/CRT.frag`
          : `${CONFIG}/shaders/${shader.value}.glsl`
    }`,
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
