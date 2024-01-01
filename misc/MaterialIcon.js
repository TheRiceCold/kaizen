import { Widget } from '../imports.js'

export default (icon, size, props = {}) => 
  Widget.Label({
    className: `icon-material txt-${size}`,
    label: icon,
    ...props,
  })
