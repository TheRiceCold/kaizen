import popups from 'service/popups'

import Content from './Content'
import Textbox from './Textbox'

import PopupRevealer from '../../PopupRevealer'

export default PopupRevealer({
  vertical: true,
  className: 'ask',
  children: [ Content, Textbox ],
  reveal: popups.bind('ask-shown')
})
