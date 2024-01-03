import { Audio } from '../../../imports.js'
import { FontIcon } from '../../../misc/main.js'
import { SimpleToggleButton } from '../ToggleButton.js'

import { icons } from '../../../constants/main.js'

export default () => SimpleToggleButton({
  icon: FontIcon({
    connections: [[Audio, icon => {
      icon.icon = Audio.microphone?.is_muted ? icons.audio.mic.muted : icons.audio.mic.high
    }, 'microphone-changed']],
  }),
  toggle: () => Audio.microphone.is_muted = !Audio.microphone.is_muted,
  connection: [Audio, () => Audio.microphone?.is_muted],
})
