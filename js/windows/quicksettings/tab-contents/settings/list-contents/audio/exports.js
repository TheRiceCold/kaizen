const sorm = type => type === 'sink' ? 'speaker' : 'microphone'

const iconSubstitute = (item, type) => {
  const microphoneSubstitutes = {
    'audio-headset-analog-usb': 'audio-headset-symbolic',
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-input-microphone-symbolic',
    'audio-card-analog-pci': 'audio-input-microphone-symbolic',
    'audio-card-analog': 'audio-input-microphone-symbolic',
    'camera-web-analog-usb': 'camera-web-symbolic'
  };
  const substitutes = {
    'audio-headset-bluetooth': 'audio-headphones-symbolic',
    'audio-card-analog-usb': 'audio-speakers-symbolic',
    'audio-card-analog-pci': 'audio-speakers-symbolic',
    'audio-card-analog': 'audio-speakers-symbolic',
    'audio-headset-analog-usb': 'audio-headset-symbolic'
  }

  if (type === 'sink')
    return substitutes[item] || item

  return microphoneSubstitutes[item] || item
}

export {
  sorm,
  iconSubstitute
}
