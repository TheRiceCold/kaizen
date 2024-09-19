import { VBox } from 'widgets'
import Group from './Group'

const { Box, Scrollable } = Widget

export default <T>(
  name: string,
  icon: string,
  ...groups: ReturnType<typeof Group<T>>[]
) => Box(
  { className: 'page', attribute: { name, icon } },
  Scrollable({ css: 'min-height: 300px;' }, VBox({ vexpand: true, className: 'page-content' }, ...groups),
  ))
