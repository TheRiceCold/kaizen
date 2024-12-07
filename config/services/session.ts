import { exec, GObject, property } from 'astal'

export default class Session extends GObject.Object {
  static instance: Session
  static get_default(): Session {
    if (!this.instance) this.instance = new Session()
    return this.instance
  }


  #title = ''
  #cmd = ''

  @property(String)
  get title() { return this.#title }

  @property(String)
  get cmd() { return this.#cmd }

  action(action: string) {
    [this.#cmd, this.#title] = {
      sleep: [ 'systemctl suspend', 'Sleep' ],
      reboot: [ 'systemctl reboot', 'Reboot' ],
      logout: [ 'pkill Hyprland', 'Log Out' ],
      shutdown: [ 'shutdown now', 'Shutdown' ],
    }[action]

    this.notify('cmd')
    this.notify('title')
    this.emit('changed')
    App.closeWindow('powermenu')
    App.openWindow('verification')
  }

  readonly shutdown = () => this.action('shutdown')
  readonly exec = () => {
    App.closeWindow('verification')
    exec(this.#cmd)
  }
}
