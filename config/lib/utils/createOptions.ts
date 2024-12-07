import Variable from 'astal/variable'
import { monitorFile, readFile, writeFile } from 'astal'

import options from 'options'
import { ensureDirectory } from '.'
import { USER_CONFIG } from 'lib/paths'
import { Option } from 'variables/option'

function getOptions(object: any, path = ''): Option[] {
  return Object.keys(object).flatMap(key => {
    const obj: Option = object[key]
    const id = path ? `${path}.${key}`: key

    if (obj instanceof Variable) {
      obj.id = id
      return obj
    }

    if (typeof obj === 'object')
      return getOptions(obj, id)

    return []
  })
}

export function createOptions<T extends object>(object: T) {
  ensureDirectory(USER_CONFIG)

  const configFile = `${USER_CONFIG}/settings.json`

  const values = getOptions(object)
    .reduce((obj, opt) => ({ [opt.id]: opt.get(), ...obj }), {})
  writeFile(configFile, JSON.stringify(values, null, 2))
  monitorFile(configFile, () => {
    const cache = JSON.parse(readFile(configFile) || '{}')
    for (const opt of getOptions(object)) {
      if (JSON.stringify(cache[opt.id]) !== JSON.stringify(opt.get()))
        opt.set(cache[opt.id])
    }
  })

  function sleep(ms = 0) {
    return new Promise(r => setTimeout(r, ms))
  }

  async function reset(
    [opt, ...list] = getOptions(object),
    id = opt?.reset(),
  ): Promise<Array<string>> {
    if (!opt) return sleep().then(() => [])

    return id
      ? [id, ...(await sleep(50).then(() => reset(list)))]
      : await sleep().then(() => reset(list))
  }

  return Object.assign(object, {
    configFile,
    array: () => getOptions(object),
    reset: async () => (await reset()).join('\n'),
    handler(deps: string[], callback: () => void) {
      for (const opt of getOptions(options)) {
        if (deps.some(i => opt.id.startsWith(i)))
          opt.subscribe(callback)
      }
    },
  })
}
