import { VBox } from 'widgets'
import Result from './Result'
import ColorTypeContent from './ColorTypeContent'

export default Widget.Box({
  className: 'output',
  children: [
    Result,
    VBox(
      { vpack: 'center' },
      ColorTypeContent('hex'),
      ColorTypeContent('rgb'),
      ColorTypeContent('hsl'),
    ),
  ]
})
