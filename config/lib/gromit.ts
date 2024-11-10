import options from 'options'

const { scheme, dark, light } = options.theme
const configDir = imports.gi.GLib.get_user_config_dir()

export default function init() {
  options.handler([
    dark.primary.bg.id,
    light.primary.bg.id,
  ], setupGromit)
}

async function setupGromit() {
  const isDarkMode = (scheme === 'dark')
  const primaryColor = isDarkMode ? light.primary.bg : dark.primary.bg
  const secondaryColor = isDarkMode ? light.primary.fg : dark.primary.fg

  const config = [
    // Tools
    '"eraser" = ERASER (size=75)',
    `"pen primary" = PEN (size=4 color="${primaryColor}")`,
    `"line primary" = LINE (size=4 color="${primaryColor}")`,
    `"rect primary" = RECT (size=4 color="${primaryColor}")`,
    `"arrow primary" = PEN (size=4 color="${primaryColor}" arrowsize=2)`,
    `"line arrow primary" = LINE (size=4 color="${primaryColor}" arrowsize=2)`,

    `"pen secondary" = PEN (size=4 color="${secondaryColor}")`,
    `"line secondary" = LINE (size=4 color="${secondaryColor}")`,
    `"rect secondary" = RECT (size=4 color="${secondaryColor}")`,
    `"arrow secondary" = PEN (size=4 color="${secondaryColor}" arrowsize=2)`,
    `"line arrow secondary" = LINE (size=4 color="${secondaryColor}" arrowsize=2)`,

    // Input
    '"default"[3] = "eraser"',
    '"default" = "pen primary"',
    '"default"[2] = "rect primary"',
    '"default"[SHIFT] = "line primary"',
    '"default"[CONTROL] = "arrow primary"',
    '"default"[SHIFT,CONTROL] = "line arrow primary"',

    '"default"[ALT] = "pen secondary"',
    '"default"[SHIFT,ALT] = "line secondary"',
    '"default"[CONTROL,ALT] = "arrow secondary"',
    '"default"[SHIFT,CONTROL,ALT] = "line arrow secondary"',
    '"default"[Button2,ALT] = "line arrow secondary";',
  ]

  await Utils.writeFile([
    '[General]',
    'ShowIntroOnStartup=false',
    '[Drawing]',
    'Opacity=Int16Array',
  ].join('\n'), `${configDir}/gromit-mpx.ini`)

  await Utils.writeFile(config.join(';\n'), `${configDir}/gromit-mpx.cfg`)
}
