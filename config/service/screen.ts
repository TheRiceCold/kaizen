import options from 'options'
import { dependencies, sh, bash, hyprland } from 'lib/utils'

const { GLib } = imports.gi
const dateFormat = '%Y-%m-%d_%H-%M-%S'
const now = GLib.DateTime.new_now_local().format(dateFormat)

export type CaptureType = 'record' | 'screenshot'
export type GeometryType = 'region' | 'fullscreen'

class Screen extends Service {
  static {
    Service.register(this, {}, {
      timer: ['int'],
      'is-recording': ['boolean'],
      'zoom-amount': ['int', 'r'],
      'capture-type': ['string'],
      'geometry-type': ['string'],
      'audio-enabled': ['boolean'],
    })
  }

  #recorderDir = options.tools.recorder.directory.value
  #screenshotDir = options.tools.screenshots.directory.value
  #recordFile = ''
  #interval = 0

  #timer = 0
  #zoomAmount = 1
  #isRecording = false
  #audioEnabled = false
  #captureType: CaptureType = 'record'
  #geometryType: GeometryType = 'region'

  get timer() { return this.#timer }
  get zoom_amount() { return this.#zoomAmount }
  get is_recording() { return this.#isRecording }
  get capture_type() { return this.#captureType }
  get geometry_type() { return this.#geometryType }
  get audio_enabled() { return this.#audioEnabled }

  set capture_type(type: CaptureType) {
    this.#captureType = type
    this.changed('capture-type')
  }

  set geometry_type(type: GeometryType) {
    this.#geometryType = type
    this.changed('geometry-type')
  }

  set audio_enabled(val: boolean) {
    this.#audioEnabled = val
    this.changed('audio-enabled')
  }

  async zoom(amount: number) {
    hyprland.keyword(`cursor:zoom_factor ${amount}`)
    this.#zoomAmount = amount
    this.changed('zoom-amount')
  }

  async record() {
    if (!dependencies('slurp', 'wf-recorder')) return

    if (this.#isRecording) return
    Utils.ensureDirectory(this.#recorderDir)
    this.#recordFile = `${this.#recorderDir}/${now}.mp4`

    const cmd = `wf-recorder ${
      (this.#geometryType === 'region')
        ? `-g "${await sh('slurp')}" ` : ''
    }-f ${this.#recordFile} ${this.#audioEnabled ? '--audio' : ''}`

    sh(cmd)

    this.#isRecording = true
    this.changed('is-recording')

    this.#timer = 0
    this.#interval = Utils.interval(1000, () => {
      this.changed('timer')
      this.#timer++
    })
  }

  async recordStop() {
    if (!this.#isRecording) return
    sh('pkill wf-recorder')
    this.#isRecording = false
    this.changed('#isRecording')
    GLib.source_remove(this.#interval)

    this.#notify('record', this.#recordFile)
  }

  async shot() {
    if (!dependencies('slurp', 'grim')) return

    const size = await sh('slurp')
    const file = `${this.#screenshotDir}/${now}.png`
    Utils.ensureDirectory(this.#screenshotDir)

    switch(this.#geometryType) {
      case 'region': default:
        if (!size) return
        await sh(`grim -g "${size}" ${file}`)
        break
      case 'fullscreen':
        await sh(`grim ${file}`)
    }

    bash`wl-copy < ${file}`
    this.#notify('shot', file)
  }

  #notify(type: 'shot' | 'record', filePath: string) {
    let actions = {}
    switch(type) {
      case 'record':
        actions = {
          'Show in Files': () => sh(`xdg-open ${this.#recorderDir}`),
        }; break
      case 'shot': default:
        actions = {
          'Show in Files': () => sh(`xdg-open ${this.#screenshotDir}`),
          Edit() { if (dependencies('swappy')) sh(`swappy -f ${filePath}`) },
        }; break
    }

    Utils.notify({
      body: filePath,
      image: filePath,
      summary: type === 'shot' ? 'Screenshot' : 'Screen record',
      actions: {
        View() { sh(`xdg-open ${filePath}`) },
        ...actions
      }
    })
  }

}

export default new Screen
