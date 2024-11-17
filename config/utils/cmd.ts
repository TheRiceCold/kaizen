import { execAsync } from 'astal'

export async function bash(
  strings: TemplateStringsArray | string,
  ...values: unknown[]
) {
  const cmd = typeof strings === 'string' ? strings
    : strings.flatMap((str, i) => str + `${values[i] ?? ''}`).join('')

  return execAsync(['bash', '-c', cmd]).catch((err) => {
    console.error(cmd, err)
    return ''
  })
}

export const sh = async (cmd: string | string[]) =>
  execAsync(cmd).catch((err) => {
    console.error(typeof cmd === 'string' ? cmd : cmd.join(' '), err)
    return ''
  })
