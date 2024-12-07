import { bind } from 'astal'
import { Gtk } from 'astal/gtk3'

import BrightnessService from 'services/brightness'

import icons from 'data/icons'

const brightness = bind(BrightnessService.get_default(), 'screen')

export default () => (
  <box name='brightness' halign={Gtk.Align.CENTER}>
    <circularprogress className='progress' value={brightness}>
      <icon className='icon' icon={icons.brightness.indicator} />
    </circularprogress>
    <label label={brightness.as(val => Math.round(val * 100)+'%')} />
  </box>
)
