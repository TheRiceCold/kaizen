import { substitutes } from 'data/icons'

export function setIcon(name: string | null, fallback = name) {
  if (!name) return fallback || ''

  if (GLib.file_test(name, GLib.FileTest.EXISTS)) return name

  const icon = substitutes[name] || name
  if (Utils.lookUpIcon(icon)) return icon

  print(`no icon substitute '${icon}' for '${name}', fallback: '${fallback}'`)
  return fallback
}

export const audioIconSub = (item: string, type: 'microphone' | 'speaker') => {
  const microphoneSubstitutes = {
    'audio-headset-analog-usb': 'audio-headset-symbolic',
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-input-microphone-symbolic',
    'audio-card-analog-pci': 'audio-input-microphone-symbolic',
    'audio-card-analog': 'audio-input-microphone-symbolic',
    'camera-web-analog-usb': 'camera-web-symbolic',
  }
  const substitutes = {
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-speakers-symbolic',
    'audio-card-analog-pci': 'audio-speakers-symbolic',
    'audio-card-analog': 'audio-speakers-symbolic',
    'audio-headset-analog-usb': 'audio-headset-symbolic',
  }

  if (type === 'speaker') {
    return substitutes[item] || item
  }
  return microphoneSubstitutes[item] || item
}
