import { exec, execAsync } from 'astal'
import AstalNotifd from 'gi://AstalNotifd'

const notif = AstalNotifd.get_default()

export function Notify(notifPayload: notif.Notification): void {
    let command = 'notify-send'
    command += ` "${notifPayload.summary} "`
    if (notifPayload.body) command += ` "${notifPayload.body}" `
    if (notifPayload.appName) command += ` -a "${notifPayload.appName}"`
    if (notifPayload.iconName) command += ` -i "${notifPayload.iconName}"`
    if (notifPayload.urgency) command += ` -u "${notifPayload.urgency}"`
    if (notifPayload.timeout !== undefined) command += ` -t ${notifPayload.timeout}`
    if (notifPayload.category) command += ` -c "${notifPayload.category}"`
    if (notifPayload.transient) command += ` -e`;
    if (notifPayload.id !== undefined) command += ` -r ${notifPayload.id}`

    execAsync(command)
}

export function dependencies(...bins: string[]) {
  const missing = bins.filter(bin => exec(`which ${bin}`))

  if (missing.length > 0) {
    console.warn(Error(`missing dependencies: ${missing.join(', ')}`))
    //notify(`missing dependencies: ${missing.join(', ')}`)
  }

  return missing.length === 0
}

export { fetch } from './fetch'
export { sh, bash } from './cmd'
export { capitalize } from './string'
export { createOptions } from './createOptions'
export { fileExists, ensureDirectory } from './file'
