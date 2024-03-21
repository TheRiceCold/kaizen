import icons from 'data/icons'

const DELAY = 2500
const audio = await Service.import('audio')

export default () => {
  const icon = Widget.Icon({ className: 'microphone' })
  const revealer = Widget.Revealer({ transition: 'slide_up', child: icon })

  let count = 0
  let mute = audio.microphone.stream?.is_muted ?? false

  return revealer.hook(audio.microphone, () => Utils.idle(() => {
    if (mute !== audio.microphone.stream?.is_muted) {
      mute = audio.microphone.stream!.is_muted
      icon.icon = icons.audio.mic[ mute ? 'muted' : 'high' ]
      revealer.revealChild = true
      count++

      Utils.timeout(DELAY, () => {
        count--
        if (count === 0)
          revealer.revealChild = false
      })
    }
  }))
}
