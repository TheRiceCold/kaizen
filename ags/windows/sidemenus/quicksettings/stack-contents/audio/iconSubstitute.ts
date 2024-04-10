type Type = 'microphone' | 'speaker'

export default (item, type: Type) => {
  const microphoneSubstitutes = {
    'audio-headset-analog-usb': 'audio-headset-symbolic',
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-input-microphone-symbolic',
    'audio-card-analog-pci': 'audio-input-microphone-symbolic',
    'audio-card-analog': 'audio-input-microphone-symbolic',
    'camera-web-analog-usb': 'camera-web-symbolic'
  }
  const substitutes = {
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-speakers-symbolic',
    'audio-card-analog-pci': 'audio-speakers-symbolic',
    'audio-card-analog': 'audio-speakers-symbolic',
    'audio-headset-analog-usb': 'audio-headset-symbolic'
  }

  if (type === 'speaker') {
    return substitutes[item] || item
  }
  return microphoneSubstitutes[item] || item
}
