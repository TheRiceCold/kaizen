import options from 'options'
import { dependencies, sh, bash, hyprland } from 'lib/utils'

const { scheme, dark, light } = options.theme

export const action = (arg: string) => sh(`gromit-mpx --${arg}`)

export async function start() {
  if (!dependencies('gromit-mpx')) return
  await setupConfig()
  bash`gromit-mpx -q || gromit-mpx -a`

  hyprland.sendBatch([
    'windowrule noblur, ^(Gromit-mpx)$',
    'windowrule noshadow, ^(Gromit-mpx)$',
    'windowrule opacity 1 override 1, ^(Gromit-mpx)$',
  ])
}

async function setupConfig() {
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

  try {
    await Utils.writeFile([
      '[General]',
      'ShowIntroOnStartup=false',
      '[Drawing]',
      'Opacity=Int16Array',
    ].join('\n'), `/home/${Utils.USER}/.config/gromit-mpx.ini`)

    await Utils.writeFile(config.join(';\n'), `/home/${Utils.USER}/.config/gromit-mpx.cfg`)
  } catch (err) {
    logError(err)
  }
}
