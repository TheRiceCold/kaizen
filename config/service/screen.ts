import { sh, bash, hyprland, dependencies } from 'lib/utils'

class Screen extends Service {
  static {
    Service.register(this, {}, {
      'blur-enabled': ['boolean'],
      'magnify-level': ['int', 'r'],
    })
  }

  #magnifyLevel = 1
  #blurEnabled = false

  get blur_enabled() { return this.#blurEnabled }
  get magnify_level() { return this.#magnifyLevel }

  set blur_enabled(enabled: boolean) {
    this.#blurEnabled = enabled
    this.changed('blur-enabled')
  }

  draw() {
    if (!dependencies('gromit-mpx')) return
    bash`gromit-mpx -q || gromit-mpx -a`

    hyprland.sendBatch([
      'windowrule noblur, ^(Gromit-mpx)$',
      'windowrule noshadow, ^(Gromit-mpx)$',
      'windowrule opacity 1 override 1, ^(Gromit-mpx)$',
    ])
  }

  drawAction(arg: string) {
    sh(`gromit-mpx --${arg}`)
  }

  toggleBlur() {
    hyprland.keyword(`windowrule noblur ${this.#blurEnabled ? 0 : 1}, ^(Gromit-mpx)$`)
    this.#blurEnabled = !this.#blurEnabled
    this.changed('blur-enabled')
  }

  magnify(lvl: number) {
    this.#magnifyLevel = lvl
    this.changed('magnify-level')
    hyprland.keyword(`cursor:zoom_factor ${lvl}`)
  }
}

export default new Screen
