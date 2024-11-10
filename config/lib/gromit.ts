import options from 'options'

const { scheme,
  dark: { primary: { bg: darkBg, fg: darkFg } },
  light: { primary: { bg: lightBg, fg: lightFg } },
} = options.theme
const configDir = imports.gi.GLib.get_user_config_dir()

export default function init() {
  options.handler([
    darkBg.id,
    darkFg.id,
    lightBg.id,
    lightFg.id,
  ], setupGromit)
  setupGromit()
}

async function setupGromit() {
  const isDarkMode = (scheme.value === 'dark')
  const primaryColor =  isDarkMode ? lightBg : darkBg
  const secondaryColor = isDarkMode ? lightFg : darkFg

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
    '"default"[Button2,ALT] = "rect secondary"',
    '"default"[CONTROL,ALT] = "arrow secondary"',
    '"default"[SHIFT,CONTROL,ALT] = "line arrow secondary";',
  ]

  await Utils.writeFile([
    '[General]',
    'ShowIntroOnStartup=false',
    '[Drawing]',
    'Opacity=Int16Array',
  ].join('\n'), `${configDir}/gromit-mpx.ini`)

  await Utils.writeFile(config.join(';\n'), `${configDir}/gromit-mpx.cfg`)
}
