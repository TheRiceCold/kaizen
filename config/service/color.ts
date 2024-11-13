import { sh, clamp, dependencies } from 'lib/utils'
import icons from 'data/icons'

class Color extends Service {
  static {
    Service.register(this, {
      assigned: ['int'],
      hue: [],
      sl: [],
    }, {
      picked: ['string'],
    })
  }

  #hue = 198
  #xAxis = 94
  #yAxis = 80
  #picked = ''

  constructor() {
    super()
    this.emit('changed')
  }

  async pick() {
    if (!dependencies('hyprpicker')) return

    await sh('hyprpicker -a -r') // NOTE: returns the previous picked color
    const color = await sh('wl-paste') // INFO: returns the last picked color

    this.picked_hex = color
    Utils.notify({
      summary: color,
      iconName: icons.ui.colorpicker,
    })
  }

  hexToRgb(hex: string): string {
    hex = hex.replace('#', '')
    if (hex.length === 3)
      hex = hex.split('').map(char => char + char).join('')

    const bigint = parseInt(hex, 16)
    const r = (bigint >> 16) & 255
    const g = (bigint >> 8) & 255
    const b = bigint & 255
    return `rgb(${r}, ${g}, ${b})`
  }

  hexToHsl(hex: string): string {
    const rgb = this.hexToRgb(hex)
      .match(/\d+/g)
      ?.map(Number) as [number, number, number]
    return this.rgbToHsl(rgb[0], rgb[1], rgb[2])
  }

  rgbToHex(r: number, g: number, b: number): string {
    return ('#' + [r, g, b].map(x => {
      const hex = x.toString(16)
      return hex.length === 1 ? '0' + hex : hex
    }).join(''))
  }

  rgbToHsl(r: number, g: number, b: number): string {
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b)
    const min = Math.min(r, g, b)
    let h: number, s: number, l: number = (max + min) / 2

    if (max === min) {
      h = s = 0 // achromatic
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r:
          h = (g - b) / d + (g < b ? 6 : 0)
          break
        case g:
          h = (b - r) / d + 2
          break
        case b:
          h = (r - g) / d + 4
          break
      }
      h /= 6
    }

    h = Math.round(h * 360)
    s = Math.round(s * 100)
    l = Math.round(l * 100)
    return `hsl(${h}, ${s}%, ${l}%)`
  }

  hslToHex(h: number, s: number, l: number): string {
    const rgb = this.hslToRgb(h, s, l)
      .match(/\d+/g)
      ?.map(Number) as [number, number, number]
    return this.rgbToHex(rgb[0], rgb[1], rgb[2])
  }

  hslToRgb(h: number, s: number, l: number): string {
    s /= 100
    l /= 100

    let c = (1 - Math.abs(2 * l - 1)) * s
    let x = c * (1 - Math.abs((h / 60) % 2 - 1))
    let m = l - c / 2
    let r: number = 0, g: number = 0, b: number = 0

    if (0 <= h && h < 60) {
      r = c; g = x; b = 0
    } else if (60 <= h && h < 120) {
      r = x; g = c; b = 0
    } else if (120 <= h && h < 180) {
      r = 0; g = c; b = x
    } else if (180 <= h && h < 240) {
      r = 0; g = x; b = c
    } else if (240 <= h && h < 300) {
      r = x; g = 0; b = c
    } else if (300 <= h && h < 360) {
      r = c; g = 0; b = x
    }

    r = Math.round((r + m) * 255)
    g = Math.round((g + m) * 255)
    b = Math.round((b + m) * 255)
    return `rgb(${r}, ${g}, ${b})`
  }

  set hue(value) {
    this.#hue = clamp(value, 0, 360)
    this.emit('hue')
    this.emit('changed')
  }
  set xAxis(value) {
    this.#xAxis = clamp(value, 0, 100)
    this.emit('sl')
    this.emit('changed')
  }
  set yAxis(value) {
    this.#yAxis = clamp(value, 0, 100)
    this.emit('sl')
    this.emit('changed')
  }
  set picked_hex(color: string) {
    this.#picked = color
    this.changed('picked')
  }

  get hue(): number { return this.#hue }
  get yAxis(): number { return this.#yAxis }
  get xAxis(): number { return this.#xAxis }
  get picked_hex(): string { return this.#picked }
  get picked_rgb(): string { return this.hexToRgb(this.picked_hex) }
  get picked_hsl(): string { return this.hexToHsl(this.picked_hex) }
}

export default new Color
