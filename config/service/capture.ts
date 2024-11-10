import { dependencies, sh, bash } from 'lib/utils'
import options from 'options'

const { GLib } = imports.gi
const dateFormat = '%Y-%m-%d_%H-%M-%S'
const now = GLib.DateTime.new_now_local().format(dateFormat)

export type GeometryType = 'region' | 'fullscreen'
export type CaptureType = 'audio' | 'record' | 'screenshot'

const { audioDir, screenshotsDir, recorderDir } = options.tools.capture

class Screen extends Service {
  static {
    Service.register(this, {}, {
      timer: ['int'],
      'is-recording': ['boolean'],
      'capture-type': ['string'],
      'geometry-type': ['string'],
      'audio-enabled': ['boolean'],
      'audio-recording': ['boolean'],
    })
  }

  #interval = 0
  #audioFile = ''
  #recordFile = ''
  #screenshotFile = ''
  #audioDir = audioDir.value
  #recorderDir = recorderDir.value
  #screenshotDir = screenshotsDir.value

  #timer = 0
  #isRecording = false
  #audioEnabled = false
  #audioRecording = false
  #captureType: CaptureType = 'record'
  #geometryType: GeometryType = 'region'

  // Private methods
  #startTimer(type: CaptureType) {
    switch(type) {
      case 'record': default:
        this.#isRecording = true
        this.changed('is-recording')
        break
      case 'audio':
        this.#audioRecording = true
        this.changed('audio-recording')
        break
    }

    this.#timer = 0
    this.#interval = Utils.interval(1000, () => {
      this.changed('timer')
      this.#timer++
    })
  }

  #notify(type: CaptureType) {
    switch(type) {
      case 'audio':
        Utils.notify({
          body: this.#audioFile,
          image: this.#audioFile,
          summary: 'Audio record',
          actions: {
            View: () => sh(`xdg-open ${this.#audioFile}`),
            'Show in Files': () => sh(`xdg-open ${this.#audioDir}`),
          }
        })
        break
      case 'record':
        Utils.notify({
          body: this.#recordFile,
          image: this.#recordFile,
          summary: 'Screen record',
          actions: {
            View: () => sh(`xdg-open ${this.#recordFile}`),
            'Show in Files': () => sh(`xdg-open ${this.#recorderDir}`),
          }
        })
        break
      case 'screenshot': default:
        Utils.notify({
          body: this.#recordFile,
          image: this.#recordFile,
          summary: 'Screen record',
          actions: {
            View: () => sh(`xdg-open ${this.#screenshotFile}`),
            'Edit': () => { if (dependencies('swappy')) sh(`xdg-open ${this.#screenshotDir}`) },
            'Show in Files': () => sh(`xdg-open ${this.#screenshotDir}`),
          }
        })
        break
    }
  }

  // Public methods
  async screenshot() {
    if (!dependencies('slurp', 'grim')) return

    const size = await sh('slurp')
    const file = `${this.#screenshotDir}/${now}.png`
    this.#screenshotFile = file
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
    this.#notify('screenshot')
  }

  audioRecord() {
    if (!dependencies('pipewire')) return
    Utils.ensureDirectory(this.#audioDir)
    this.#audioFile = `${this.#audioDir}/${now}.mp3`
    sh(`pw-record ${this.#audioDir}/${now}.mp3`)

    this.#startTimer('audio')
  }

  async record() {
    if (!dependencies('slurp', 'wf-recorder')) return
    Utils.ensureDirectory(this.#recorderDir)
    this.#recordFile = `${this.#recorderDir}/${now}.mp4`

    const cmd = `wf-recorder ${
      (this.#geometryType === 'region')
        ? `-g "${await sh('slurp')}" ` : ''
    }-f ${this.#recordFile} ${this.#audioEnabled ? '--audio' : ''}`

    sh(cmd)
    this.#startTimer('record')
  }

  recordStop() {
    if (this.#isRecording) {
      sh('pkill wf-recorder')
      this.#isRecording = false
      this.changed('is-recording')
      this.#notify('record')
    } else if (this.#audioRecording) {
      sh('pkill pw-record')
      this.#audioRecording = false
      this.changed('audio-recording')
      this.#notify('audio')
    }

    GLib.source_remove(this.#interval)
  }

  // Getters
  get timer() { return this.#timer }
  get is_recording() { return this.#isRecording }
  get audio_recording() { return this.#audioRecording }
  get capture_type() { return this.#captureType }
  get geometry_type() { return this.#geometryType }
  get audio_enabled() { return this.#audioEnabled }

  // Setters
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
}

export default new Screen
