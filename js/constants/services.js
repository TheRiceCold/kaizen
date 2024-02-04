const resource = file => `resource:///com/github/Aylur/ags/${file}.js`
const service = async file => (await import(resource(`service/${file}`))).default

// SERVICES
export const Applications = await service('applications')
export const Audio = await service('audio')
export const Battery = await service('battery')
export const Bluetooth = await service('bluetooth')
export const Hyprland = await service('hyprland')
export const Mpris = await service('mpris')
export const Network = await service('network')
export const Notifications = await service('notifications')
export const SystemTray = await service('systemtray')
