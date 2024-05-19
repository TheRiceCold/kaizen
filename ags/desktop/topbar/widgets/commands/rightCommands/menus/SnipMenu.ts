import Menu from '../../Menu'
import screenTools from 'service/screen'

const snip = (label: string, full: boolean) => ({
  label, onActivate: () => screenTools.screenshot(full)
})

export default self => Menu(self, [
  snip('Fullscreen', true),
  snip('Region', false),
])
