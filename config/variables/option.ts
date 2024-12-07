import { readFile, writeFile, Variable } from 'astal'

export class Option<T = unknown> extends Variable<T> {
  constructor(initial: T) {
    super(initial)
    this.initial = initial
  }

  id = ''
  initial: T

  init(cacheFile: string) {
    const cacheV = JSON.parse(readFile(cacheFile) || '{}')[this.id]
    if (cacheV !== undefined) this.set(cacheV)

    this.subscribe(() => {
      const cache = JSON.parse(readFile(cacheFile) || '{}')
      cache[this.id] = this.get()
      writeFile(cacheFile, JSON.stringify(cache, null, 2))
    })
  }

  reset() {
    if (JSON.stringify(this.get()) !== JSON.stringify(this.initial)) {
      this.set(this.initial)
      return this.id
    }
  }
}

export const opt = <T>(initial: T) => new Option(initial)
