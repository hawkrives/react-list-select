import React from 'react'
import cx from 'classnames'
import map from 'lodash/collection/map'
import includes from 'lodash/collection/includes'
import isNumber from 'lodash/lang/isNumber'
import {KEYS, KEY} from './keys'
import ListItem from './ListItem'

let List = React.createClass({
	getDefaultProps() {
		return {
			items: [],
			selected: [],
			disabled: [],
			multiple: false,
			onChange: () => {}
		}
	},

	getInitialState() {
		return {
			items: this.props.items,
			selectedItems: this.props.selected,
			disabledItems: this.props.disabled,
			focusedIndex: null,
		}
	},

	componentWillReceiveProps(nextProps) {
		this.setState({
			items: nextProps.items,
			selectedItems: nextProps.selected,
			disabledItems: nextProps.disabled,
		})
	},

	clear() {
		this.setState({selected: [], disabled: [], focusedIndex: null})
	},

	select({index=null, contiguous=false}={}) {
		console.log(index, contiguous)
		if (!isNumber(index))
			return

		if (includes(this.state.disabledItems, index))
			return

		let {multiple} = this.props
		let {lastSelected} = this.state
		let selectedItems = multiple ? this.state.selectedItems.concat(index) : [index]

		if (contiguous && multiple && isNumber(lastSelected)) {
			let start = min([lastSelected, index])
			let end = max([lastSelected, index])

			selectedItems = uniq(selectedItems.concat(range(start, end + 1)))
		}

		this.setState({selectedItems, lastSelected: index})

		this.props.onChange(multiple ? selectedItems : index)
	},

	deselect(index) {
		let {selectedItems} = this.state
		let indexOf = selectedItems.indexOf(index)

		selectedItems.splice(indexOf, 1)

		this.setState({selectedItems})
		this.props.onChange(this.props.multiple ? selectedItems : null)
	},

	enable(index) {
		let {disabledItems} = this.state
		let indexOf = disabledItems.indexOf(index)

		disabledItems.splice(indexOf, 1)

		this.setState({disabledItems})
	},

	disable(index) {
		this.setState({disabledItems: this.state.disabledItems.concat(index)})
	},

	focusItem({next=false, previous=false, index=null}={}) {
		let {focusedIndex, disabledItems} = this.state
		let lastItem = this.state.items.length - 1

		if (next) {
			if (focusedIndex == null) {
				focusedIndex = 0
			}
			else {
				// focus first item if reached last item in the list
				focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex = focusedIndex >= lastItem ? 0 : focusedIndex + 1
				}
			}
		}

		else if (previous) {
			if (focusedIndex == null) {
				focusedIndex = lastItem
			}
			else {
				// focus last item if reached the top of the list
				focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1
			}

			// skip disabled items
			if (disabledItems.length) {
				while (includes(disabledItems, focusedIndex)) {
					focusedIndex = focusedIndex <= 0 ? lastItem : focusedIndex - 1
				}
			}
		}

		else if (!includes(disabledItems, index) && isNumber(index)) {
			focusedIndex = index
		}

		this.setState({focusedIndex})
	},

	onKeyDown(event) {
		let key = event.keyCode

		if (key == KEY.UP || key == KEY.K) {
			this.focusItem({previous: true})
		}
		else if (key == KEY.DOWN || key == KEY.J) {
			this.focusItem({next: true})
		}
		else if (key == KEY.SPACE || key == KEY.ENTER) {
			this.toggleSelect({event, index: this.state.focusedIndex})
		}

		// prevent default behavior, in some situations pressing the key
		// up / down would scroll the browser window
		if (includes(KEYS, key)) {
			event.preventDefault()
		}
	},

	toggleSelect({event, index}={}) {
		let shift = event.shiftKey

		if (!includes(this.state.selectedItems, index)) {
			this.select({index, contiguous: shift})
		}
		else if (this.props.multiple) {
			this.deselect({index})
		}
	},

	render() {
		let items = map(this.props.items, (itemContent, index) => {
			let disabled = includes(this.state.disabledItems, index)
			let selected = includes(this.state.selectedItems, index)
			let focused = this.state.focusedIndex === index

			return <ListItem key={index}
				index={index}
				disabled={disabled}
				selected={selected}
				focused={focused}
				onMouseOver={(index) => this.focusItem({index})}
				onChange={this.toggleSelect}>
					{itemContent}
				</ListItem>
		})

		return <ul className={cx('react-list-select', this.props.className)}
			tabIndex={0}
			onKeyDown={this.onKeyDown}>
			{items}
		</ul>
	}
})

export default List
