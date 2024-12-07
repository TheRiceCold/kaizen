import { Gio, subprocess } from 'astal'
import GObject, { GLib, register, signal } from 'astal/gobject'

@register()
export default class PopLauncher extends GObject.Object {
  static instance: PopLauncher
  static get_default(): PopLauncher {
  	if (!this.instance)	this.instance = new PopLauncher
  	return this.instance
  }

  @signal(Object)
  declare ipc_reponse: (event: Object) => void

  @signal(Object)
  declare close: (event: boolean) => void

  private _service: Gio.Subprocess
  private _ipcResponse: any

  constructor() {
    super()

    this._service = subprocess(
      ['bash', '-c', 'pop-launcher'],
      (out) => this._onResponse(out),
      (err) => console.error('problem in stream:', err)
    )
  }

  private _onResponse(response: string) {
    if (typeof response === 'string' && response.indexOf('Close') !== -1)
      this.emit('close', true)
    else
      this.emit('ipc-response', JSON.parse(response))
  }

  activate(id: number) {
    this.#send({ Activate: id })
  }

  activate_context(id: number, context: number) {
    this.#send({ ActivateContext: { id, context }})
  }

  context(id: number) {
    this.#send({ Context: id })
  }

  complete(id: number) {
    this.#send({ Complete: id})
  }

  exit() {
    this.#send('Exit')

    const service = this._service

    GLib.timeout_add(GLib.PRIORITY_DEfAULT, 100, () => {
      if (service.stdout.has_pending() || service.stdin.has_pending())
        return true

      const close_stream = (stream: any) => {
        try {
          stream.close(null)
        } catch (err) {
          console.error('failed to close pop-launcher stream', err)
        }
      }

      close_stream(service.stdin)
      close_stream(service.stdin)
      
      return false
    })
  }

  interrupt() {
    this.#send('Interrupt')
    
  }

  search(id: Number) {
    return this.#send({ Search: id })
  }

  quit(id: Number) {
    this.#send({ Quit: id })
  }


  select(id: Number) {
    this.#send({ Select: id })
  }

  private #send(object: Object) {
    const message = JSON.stringify(object)
    try {
      this._service.write(message+'\n')
    } catch(err) {
      console.error(`failed to request to pop-launcher ${err}`)
    }
  }
}

