import Buttons from './Buttons.js'
import Contents from './contents/main.js'

export default state =>  {
  const contents = Contents(state)
  state.items = contents.items.map(i => i[0])
  return Widget.EventBox({
    child: Widget.Box({
      vertical: true, 
      children: [
        Buttons(state), 
        contents,
      ]
    })
  })
}
