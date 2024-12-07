import { bind } from 'astal'
import { Gtk } from 'astal/gtk3'

import BrightnessService from 'services/brightness'

import icons from 'data/icons'

const brightness = BrightnessService.get_default()
const screen = bind(brightness, 'screen')

export default () => (
  <box name='brightness' halign={Gtk.Align.CENTER}>
    <circularprogress className='progress' value={screen}>
      <icon className='icon' icon={icons.brightness.indicator} />
    </circularprogress>
    <label label={screen.as(val => `${Math.round(val * 100)}%`)} />
  </box>
)
