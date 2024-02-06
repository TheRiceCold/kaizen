const resource = file => `resource:///com/github/Aylur/ags/${file}.js`
const service = async file => (await import(resource(`service/${file}`))).default

export const Audio = await service('audio')
export const Mpris = await service('mpris')
export const Battery = await service('battery')
export const Network = await service('network')
export const Hyprland = await service('hyprland')
export const Bluetooth = await service('bluetooth')
export const SystemTray = await service('systemtray')
export const Applications = await service('applications')
export const Notifications = await service('notifications')
