// @flow

import * as React from 'react'
import cx from 'classnames'

type Props = {
	disabled: boolean,
	selected: boolean,
	focused: boolean,
	onMouseOver: number => any,
	children: React.Node,
	index: number,
	onChange: ({event: SyntheticMouseEvent<>, index: number}) => any,
}

export class ListItem extends React.Component<Props> {
	static defaultProps = {
		disabled: false,
		selected: false,
		focused: false,
	}

	handleMouseOver = () => {
		this.props.onMouseOver(this.props.index)
	}

	handleChange = (ev: SyntheticMouseEvent<>) => {
		this.props.onChange({event: ev, index: this.props.index})
	}

	render() {
		let props = this.props
		let classes = cx('react-list-select--item', {
			'is-disabled': props.disabled,
			'is-selected': props.selected,
			'is-focused': props.focused,
		})

		return (
			<li
				className={classes}
				onMouseOver={this.handleMouseOver}
				onClick={this.handleChange}
			>
				{props.children}
			</li>
		)
	}
}
