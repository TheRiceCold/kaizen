import Content from './Content'
import { RegularWindow } from 'widgets'

export default() => (
  <RegularWindow
    name='settings'
    visible={false}
    defaultWidth={500}
    defaultHeight={600}
    child={<Content />}
    className='settings'
  />
)
