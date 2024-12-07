import { Variable } from 'astal'
import { ButtonProps, EntryProps } from 'astal/gtk3/widget'

import Item from '../Item'
import Page from '../Page'
import SectionTitle from '../SectionTitle'

import options from 'options'
import icons from 'data/icons'
import { capitalize } from 'lib/utils'
import { BindType } from 'options/keybinds'

const { widget, popup, customBinds } = options.keybinds

export default() => {
	const keyToAdd = Variable('')

	const AddKeybind = () => (
		<box className='item'>
			<label label='Add keybind:' /> <box hexpand />
			<entry
				text={keyToAdd()}
				placeholderText='example: SUPER, X'
				setup={(self: EntryProps) => self
					.hook(self, 'notify::text', () => keyToAdd.set(self.text))}
			/>
			<button
				child={<icon icon='plus-symbolic' />}
				onClickRelease={() => {
					if (keyToAdd.get().trim() === '') return
					customBinds.set([ { key: keyToAdd.get(), exec: '' }, ...customBinds.get() ])
					keyToAdd.set('')
				}}
			/>
		</box>
	)

	return (
		<Page name='keybinds'>
			<SectionTitle label='Toggle widgets' />
			{Object.keys(widget).map(w => <Item title={capitalize(w)} opt={widget[w]} />)}
			<SectionTitle label='Toggle popups' />
			{Object.keys(popup).map(p => <Item title={capitalize(p)} opt={popup[p]} />)}

			<SectionTitle label='Custom keybinds' />
			<AddKeybind />
			{customBinds((binds: BindType[]) => binds.map((bind: BindType, i) => (
				<box
					className='item'
					onDestroy={() => customBinds.set([...customBinds.get().splice(i, 1)])}
				>
					<label label={bind.key} /> <box hexpand />
					<entry
						setup={(self: EntryProps) => self.hook(
							self, 'notify::text', () => {
								const bindReplacement = customBinds.get()
								bindReplacement[i].exec = bind.exec
								customBinds.set(bindReplacement)
							})}
					/>
					<button
						child={<icon icon={icons.ui.close} />}
						onClickRelease={(self: ButtonProps) => self.parent.destroy()}
					/>
				</box>
			)))}
		</Page>
	)
}
