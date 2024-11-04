import Item from '../Item'
import Page from '../Page'
import Group from '../Group'

import options from 'options'

const { statusbar } = options

export default Page(
  'Widgets',
  'widgets-symbolic',
  Group(
    'Status Bar',
    Item({
      type: 'enum',
      title: 'Style',
      opt: statusbar.style,
      enums: ['full', 'separated'],
    }),
    //Item({
    //  type: 'enum',
    //  title: 'Position',
    //  opt: statusbar.position,
    //  enums: ['top', 'bottom'],
    //}),
    // DOCS: https://docs.gtk.org/glib/method.DateTime.format.html
    Item({
      title: 'Date Format',
      opt: statusbar.date.format,
    }),
    Item({
      opt: statusbar.indicator.preferredPlayer,
      title: 'Preferred Player',
    }),
    Item({
      min: 200,
      title: 'Indicator Timeout Duration',
      opt: statusbar.indicator.timeoutDuration,
    }),
    //Item({
    //  opt: statusbar.indicator.visualizer.smooth,
    //  title: 'Player Visualizer Smooth',
    //}),
    //Item({
    //  opt: statusbar.indicator.visualizer.length,
    //  title: 'Player Visualizer Length',
    //}),
  ),
)
