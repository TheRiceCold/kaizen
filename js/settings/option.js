import options from '../options.js'
import reloadSass from './reloadSass.js'
import { Service } from '../imports.js'

export default class Option extends Service {
  static { Service.register(this, {}, { 'value': [ 'jsobject' ] }) }

  #value
  #sass = ''
  unit = 'px'
  noReload = false
  persist = false
  id = ''
  title = ''
  note = ''
  type = ''
  category = ''
  enums = []
  format = v => v
  sassFormat = v => v

  constructor(value, config) {
    super()
    this.#value = value
    this.type = typeof value
    this.defaultValue = value

    if (config) 
      Object.keys(config).forEach(c => this[c] = config[c])

    import('../options.js').then(this.#init.bind(this))
  }

  set sass(sass) { this.#sass = sass }
  get sass() { return this.#sass || this.id.split('.').join('-').split('_').join('-') }

  #init() {
    getOptions()

    const words = this.id
      .split('.').flatMap(w => w.split('_'))
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))

    this.title ||= words.join(' ')
    this.category ||= words.length === 1 ? 'General' : words.at(0) || 'General'
  }

  get value() { return this.#value }
  set value(value) { this.setValue(value) }

  setValue(value, reload = false) {
    if (typeof value !== typeof this.defaultValue) {
      console.error(Error(
        `WrongType: Option "${this.id}" can't be set to ${value}, ` + 
        `expected "${typeof this.defaultValue}", but got "${typeof value}"`
      ))
      return
    }

    if (this.value !== value) {
      this.#value = this.format(value)
      this.changed('value')
      if (reload && !this.noReload) reloadSass()
    }
  }

  reset(reload = false) {
    if (!this.persist) 
      this.setValue(this.defaultValue, reload)
  }
}

export const getOptions = (object = options, path = '') =>
  Object.keys(object).flatMap(key => {
    const obj = object[key]
    const id = path ? path + '.' + key : key

    if (obj instanceof Option) {
      obj.id = id
      return obj
    }

    if (typeof obj === 'object') 
      return getOptions(obj, id)

    return []
  })


export function getValues() {
  const obj = {}
  for (const opt of getOptions())
    if (opt.category !== 'exclude')
      obj[opt.id] = opt.value

  return JSON.stringify(obj, null, 2)
}
