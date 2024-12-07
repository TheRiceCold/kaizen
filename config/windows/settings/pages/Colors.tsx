import Item from '../Item'
import Page from '../Page'
import options from 'options'
import SectionTitle from '../SectionTitle'

const { style } = options

function getColorItems(scheme: 'light' | 'dark') {
	const theme = style[scheme]
	return [
		{title: 'Foreground', opt: theme.fg},
		{title: 'Background', opt: theme.bg},
		{title: 'Primary foreground', opt: theme.primary.fg},
		{title: 'Primary background', opt: theme.primary.bg},
		{title: 'Error foreground', opt: theme.error.fg},
		{title: 'Error background', opt: theme.error.bg},
		{title: 'Border', opt: theme.border},
		{title: 'Widget', opt: theme.widget},
	].map(props => <Item type='color' {...props} />)
}

export default() => (
	<Page name='colors'>
		<SectionTitle label='Light Colorscheme' />
		{getColorItems('light')}
		<SectionTitle label='Dark Colorscheme' />
		{getColorItems('dark')}
	</Page>
)
