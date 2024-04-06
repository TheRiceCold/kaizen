import icons from 'data/icons'
import { dependencies, sh, bash } from 'lib/utils'

const hyprland = await Service.import('hyprland')
const now = () => imports.GLib.DateTime.new_now_local().format('%Y-%m-%d_%H-%M-%S')

class ScreenTools extends Service {
  static { 
    Service.register(this, {}, { 
      timer: [ 'int' ], 
      recording: [ 'boolean' ],
    }) 
  }

  #recordings = Utils.HOME + '/Videos/Records'
  #screenshots = Utils.HOME + '/Fotos/Captura'
  #file = ''
  #interval = 0

  timer = 0
  recording = false

  async start() {
    if (!dependencies('slurp', 'wf-recorder')) return

    if (this.recording) return

    Utils.ensureDirectory(this.#recordings)
    this.#file = `${this.#recordings}/${now()}.mp4`
    sh(`wf-recorder -g ${await sh('slurp')} -f ${this.#file} --pixel-format yuv420p`)

    this.recording = true
    this.changed('recording')

    this.timer = 0
    this.#interval = Utils.interval(1000, () => { this.changed('timer'); this.timer++ })
  }

  async stop() {
    if (!this.recording) return

    await bash('killall -INT wf-recorder')
    this.recording = false
    this.changed('recording')
    imports.GLib.source_remove(this.#interval)

    Utils.notify({
      summary: 'Screenrecord',
      body: this.#file,
      iconName: icons.fallback.video,
      actions: {
        'Show in Files': () => sh(`xdg-open ${this.#recordings}`),
        View: () => sh(`xdg-open ${this.#file}`),
      },
    })
  }

  async record() { Utils.notify('Fucking record') }

  async snip() { Utils.notify('Fucking snip') }

  async setDrawFullscreen() {
    if (!dependencies('gromit-mpx')) return

    Utils.timeout(500, () => {
      if (hyprland.active.client.class === 'Gromit-mpx') {
        sh('hyprctl dispatch fullscreen') // FIX: not working the 3rd time
      } else {
        this.setDrawFullscreen()
      }
    })
  }

  async draw() {
    if (!dependencies('gromit-mpx')) return

    bash`pkill gromit-mpx || gromit-mpx`
    this.setDrawFullscreen()
  }

  async zoom() {
    if (!dependencies('pypr')) return
    sh('pypr zoom')
  }
}

export default new ScreenTools
