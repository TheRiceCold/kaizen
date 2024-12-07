import Item from '../Item'
import Page from '../Page'
import SectionTitle from '../SectionTitle'

import options from 'options'

const { bar, indicator } = options

export default() => (
  <Page name='widgets'>
    <SectionTitle label='Bar' />
    <Item title='Date Format' opt={bar.date.format} />
    <Item title='Date Interval' opt={bar.date.interval} />
    <Item title='Client class substitutes' opt={bar.clientClassSubs} />
    <Item type='enum' title='Style' opt={bar.style} enums={['full', 'separated']} />

    <SectionTitle label='Indicator' />
    <Item title='Preferred Player' opt={indicator.preferredPlayer} />

    <SectionTitle label='Visualizer' />
    <Item title='Smooth' opt={indicator.visualizer.smooth} />
    <Item
      type='enum'
      title='Length'
      opt={indicator.visualizer.length}
      enums={['auto', 'short', 'normal', 'long']}
    />
  </Page>
)
