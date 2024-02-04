import { options } from '../constants/main.js'
import reloadSass from './reloadSass.js'
import setupHyprland from './setupHyprland.js'

const CACHE_FILE = Utils.CACHE_DIR + '/options.json'

/** object that holds the overriedden values */
let cacheObj = JSON.parse(Utils.readFile(CACHE_FILE) || '{}')

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


  /** @type {Array<string>} */
  enums = []

  /** @type {(v: T) => any} */
  format = v => v

  /** @type {(v: T) => any} */
  sassFormat = v => v

  constructor(value, config) {
    super()
    this.#value = value
    this.type = typeof value
    this.defaultValue = value

    if (config) 
      Object.keys(config).forEach(c => this[c] = config[c])

    import('../constants/data/options.js').then(this.#init.bind(this))
  }

  set sass(sass) { this.#sass = sass }
  get sass() { return this.#sass || this.id.split('.').join('-').split('_').join('-') }

  #init() {
    getOptions()

    if (cacheObj[this.id] !== undefined)
      this.setValue(cacheObj[this.id])

    const words = this.id
      .split('.').flatMap(w => w.split('_'))
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))

    this.title ||= words.join(' ')
    this.category ||= words.length === 1 ? 'General' : words.at(0) || 'General'

    this.connect('changed', () => {
      cacheObj[this.id] = this.value
      Utils.writeFile(
        JSON.stringify(cacheObj, null, 2),
        CACHE_FILE,
      )
    })
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
      if (reload && !this.noReload) {
        reloadSass()
        setupHyprland()
      }
    }
  }

  reset(reload = false) {
    if (!this.persist) 
      this.setValue(this.defaultValue, reload)
  }
}

export const getOptions = (object = options, path = '') => {
  return Object.keys(object).flatMap(key => {
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
}

export function resetOptions() {
  Utils.exec(`rm -rf ${CACHE_FILE}`)
  cacheObj = {}
  getOptions().forEach(opt => opt.reset())
}

export function getValues() {
  const obj = {}
  for (const opt of getOptions())
    if (opt.category !== 'exclude')
      obj[opt.id] = opt.value

  return JSON.stringify(obj, null, 2)
}

export function apply(config) {
  const options = getOptions()
  const settings = typeof config === 'string' ? JSON.parse(config) : config

  for (const id of Object.keys(settings)) {
    const opt = options.find(opt => opt.id === id)
    if (!opt) {
      print(`No option with id: "${id}"`)
      continue
    }

    opt.setValue(settings[id])
  }
}
