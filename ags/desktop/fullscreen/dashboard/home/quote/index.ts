import Quote from './Quote'
import Filter from './Filter'

export default Widget.Stack({
  className: 'quote',
  transition: 'slide_up_down',
  children: {
    quote: Quote,
    filter: Filter,
  },
})
