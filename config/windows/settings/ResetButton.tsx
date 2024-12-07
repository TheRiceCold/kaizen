import { bind } from 'astal'
import { Gtk } from 'astal/gtk3'

import icons from 'data/icons'
import { Option } from 'variables/option'

export default({opt}:{opt: Option}) => (
  <button 
    className='reset-button' 
    onClickRelease={() => opt.reset()}
    child={<icon icon={icons.ui.refresh} />}
    sensitive={bind(opt).as(v => v !== opt.initial)}
  />
)
