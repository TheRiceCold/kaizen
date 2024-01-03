import { Widget } from '../imports.js'
import { options } from '../constants/main.js'

export default props => Widget.Box({ ...props, className: 'avatar' })
  .hook(options.desktop.avatar, box => box.setCss(`
    background-size: cover;
    background-image: url('${options.desktop.avatar.value}');
  `)).on('size-allocate', box => {
    const h = box.get_allocated_height()
    box.set_size_request(Math.ceil(h * 1.1), -1)
  })
