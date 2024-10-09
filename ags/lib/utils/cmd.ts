import { type Application } from 'ts/types/service/applications'

export async function bash(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd =
    typeof strings === 'string'
      ? strings
      : strings.flatMap((str, i) => str + `${values[i] ?? ''}`).join('')

  return Utils.execAsync(['bash', '-c', cmd]).catch((err) => {
    console.error(cmd, err)
    return ''
  })
}

export const sh = async (cmd: string | string[]) =>
  Utils.execAsync(cmd).catch((err) => {
    console.error(typeof cmd === 'string' ? cmd : cmd.join(' '), err)
    return ''
  })

export function launchApp(app: Application) {
  const exe = app.executable
    .split(/\s+/)
    .filter((str: string) => !str.startsWith('%') && !str.startsWith('@'))
    .join(' ')

  sh(exe)
  app.frequency += 1
}

export const copy = (input: string) => sh(['wl-copy', input])
